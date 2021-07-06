//https://www.ibm.com/support/knowledgecenter/SSEPEK_11.0.0/apsg/src/tpc/db2z_hostvariablecobol.html
//https://www.ibm.com/support/knowledgecenter/SS6SG3_4.2.0/com.ibm.entcobol.doc_4.2/PGandLR/ref/rlddecom.htm

const USAGE = ['BINARY', 'COMP', 'COMP-1', 'COMP-2', 'COMP-3', 'COMP-4', 'COMP-5', 'PACKED-DECIMAL', 'DISPLAY', 'SIGN TRAILING SEPARATE CHARACTER', 'SIGN LEADING SEPARATE CHARACTER', 'VALUE', 'VALUES'];
const WORDS = [
    //'REDEFINES',
    'OCCURS',
    'PIC',
    'PICTURE',
    //'RENAMES'
    'SIGN',
    'VALUE',
    'VALUES'
];

class Field {
    constructor(input, id) {
        this.childs = [];
        this.id = id;
        this.start = 0;
        this.end = 0;
        this.validation = {
            level: 0,
            color: 'bg-success',
            message: []
        }
        if (input) {
            this.parseLine(input);
        }
        this.isCommented = false;

        if (this.value) this.validateValue();
    }

    validateValue() {
        if (this.type == 'AN' && this.value[0].length - 2 > this.length) this.setValidation(8, `Valor ${this.value[0]} demasiado largo para el campo con longitud ${this.length}`)
    }

    parseLine(input) {
        let level, name, type, rest;
        [level, name, type, ...rest] = input;
        this.setLevel(level);
        this.setName(name);
        if (this.name == '') [level, type, ...rest] = input;
        this.setSubstructure(type, rest);
    }

    setParent(parent) {
        this.parent = parent;
    }

    setLevel(level) {
        this.validateLevel(level);
        this.level = nf(level);
    }

    validateLevel(level) {
        if (isNaN(level)) {
            this.setValidation(8, 'Nivel no numérico');
            return false;
        }

        if (level < 1 || (level > 49 && level != 66 && level != 77 && level != 88)) {
            this.setValidation(8, 'El valor del nivel debe estar comprendido entre 1 y 49');
            return false;
        }

        return true;
    }

    setName(name) {
        this.validateName(name) ? this.name = name : this.name = '';
    }

    validateName(fieldName) {
        if (fieldName == 'PIC' ||
            fieldName == 'OCCURS' ||
            fieldName == 'REDEFINES' ||
            fieldName == '' ||
            fieldName == undefined) {
            this.setValidation(8, 'Falta el nombre');
            return false;
        }

        return true;
    }

    removePrefix(prefix) {
        const reg = new RegExp(`^${prefix}`);
        const name = this.name.replace(reg, '');
        this.setName(name);
    }

    removeSufix(sufix) {
        const reg = new RegExp(`${sufix}$`);
        const name = this.name.replace(reg, '');
        this.setName(name);
    }

    setSubstructure(type, data) {
        switch (type) {
            case 'PIC':
            case 'PICTURE':
                this.setPicture(data)
                break;
            case 'OCCURS':
                this.isOccurs = true;
                this.setOccurs(data)
                break;
            case 'REDEFINES':
                this.isRedefines = true;
                break;
            case 'VALUE':
                this.isSwitch = true;
                this.value = data;
                break;
            case undefined:
                this.isSubstructure = true;
                break;
            default:
                this.setValidation(8, `Valor '${type}' no definido`);
        }
    }

    setPicture(value) {
        this.isPic = true;
        let picText, usage;
        [picText, ...usage] = value;
        const PIC = parsePIC(picText);
        const validations = validateAll(picText);

        validations.forEach(x => this.setValidation(x.level, x.text));

        if (PIC) {
            Object.assign(this, PIC);
        } else {
            this.setValidation(8, `Picture no válida`);
        }

        if (usage.length > 0) {
            this.usage = usage.join(' ');
            if (usage[0] == 'OCCURS') {
                this.isOccurs = true;
                this.occurs = usage[1];
                this.usage = '';
                if (this.level == '01' ||
                    this.level == '66' ||
                    this.level == '77' ||
                    this.level == '88') {
                    this.setValidation(8, 'Nivel incorrecto para OCCURS');
                }
            }
        }

        if (this.type == 'AN') {
            if (usage.length > 0) {
                if (usage[0] == 'VALUE') {
                    let [, ...values] = usage;
                    this.usage = '';
                    this.setValue(values, this.type);
                } else {
                    this.setValidation(8, `Campo alfanumérico con usage: ${usage}`);
                }
            }
        } else {
            let [tempUsage, valueText, ...values] = usage;

            if (!USAGE.includes(tempUsage) && tempUsage) {
                if (usage.join(' ').substring(0, 32) != 'SIGN TRAILING SEPARATE CHARACTER' &&
                    usage.join(' ').substring(0, 31) != 'SIGN LEADING SEPARATE CHARACTER') {
                    this.setValidation(8, `Usage incorrecto: ${tempUsage}`);
                    this.usage = '';
                } else {
                    this.usage = usage.join(' ');
                    if (usage.join(' ').substring(0, 32) == 'SIGN TRAILING SEPARATE CHARACTER') {
                        let aux = this.usage.substring(33);
                        aux = aux.split(' ');
                        [valueText, ...values] = aux;
                        this.usage = this.usage.substring(0, 32);
                    } else if (usage.join(' ').substring(0, 31) != 'SIGN LEADING SEPARATE CHARACTER') {
                        let aux = this.usage.substring(32);
                        aux = aux.split(' ');
                        [valueText, ...values] = aux;
                        this.usage = this.usage.substring(0, 31);
                    }
                }
            }

            if (valueText == 'VALUE') {
                this.setValue(values);
                if (this.usage) {
                    let usage = this.usage.split(' ');
                    [this.usage,] = usage;
                }

                if (this.usage == 'VALUE') this.usage = '';
            }

            if (tempUsage == 'VALUE') {
                let [, ...values] = usage;
                this.usage = '';
                this.setValue(values)
            }

            if (tempUsage == 'COMP-3' ||
                tempUsage == 'PACKED-DECIMAL') {
                this.type = 'PD';
                this.usage = tempUsage;
                if ((this.integer + this.decimal) % 2 == 0) this.setValidation(4, 'Packed decimal par');
            }

            if (tempUsage == 'COMP-1' ||
                tempUsage == 'COMP' ||
                tempUsage == 'BINARY' ||
                tempUsage == 'COMP-4') {
                this.usage = tempUsage;
                this.type = 'BI';
            }

            if (tempUsage == 'OCCURS') {
                this.isOccurs = true;
                this.setOccurs(usage[1]);
            }

            if (this.usage == 'SIGN TRAILING SEPARATE CHARACTER' ||
                this.usage == 'SIGN LEADING SEPARATE CHARACTER') {
                if (!this.sign) this.setValidation(8, 'Campo sin signo pero con modificador de signo')
                this.type = 'SFF';
            }
        }

        if (!normalize.checked || this.mask) this.picText = value[0];

        const length = this.getLength();
        this.setLength(length);
    }

    setValue(value, type) {
        if (type == 'AN') {
            this.value = [value.join('')];
            if (this.value[0].charAt(0) != '\'') {
                this.setValidation(4, 'Falta comilla de inicio de valor alfanumérico')
            }
            if (this.value[0].charAt(this.value[0].length - 1) != '\'') {
                this.setValidation(4, 'Falta comilla de fin de valor alfanumérico')
            }
        } else {
            this.value = [value];
        }
    }

    getLength() {
        let length = 0;
        switch (this.type) {
            case 'AN':
                length = this.length;
                break;
            case 'ZA':
                length = this.integer + this.decimal;
                break;
            case 'ZD':
            case 'SFF':
                length = this.integer + this.decimal;
                if (this.usage == 'SIGN TRAILING SEPARATE CHARACTER' ||
                    this.usage == 'SIGN LEADING SEPARATE CHARACTER') {
                    length++;
                }
                break;
            case 'PD':
                length = Math.floor((this.integer + this.decimal) / 2) + 1;
                break;
            case 'BI':
                length = this.integer + this.decimal;
                if (length > 0 && length <= 4) {
                    length = 2;
                } else if (length >= 5 && length <= 9) {
                    length = 4;
                } else if (length >= 10 && length <= 18) {
                    length = 8;
                }
                break;
            default:
                this.setValidation(8, `Tipo de picture no definido: '${this.type}'`);
        }
        return length;
    }

    setLength(length) {
        this.validateLength(length) ? this.length = length : this.length = 0;
    }

    validateLength(length) {
        if (isNaN(length)) {
            this.setValidation(8, `Longitud incorrecta ${length}`);
            return false;
        } else if (length === 0) {
            this.setValidation(4, `Longitud 0`);
        }

        if (this.type != 'AN' && (this.integer + this.decimal) > 18) {
            this.setValidation(8, 'Campo numérico demasiado largo');
            return false;
        }

        return true;
    }

    setOccurs(value) {
        const num = parseInt(value);
        isNaN(num) ? this.setValidation(8, 'Occurs no numérico') : this.occurs = num;

        if (this.level == '01' ||
            this.level == '66' ||
            this.level == '77' ||
            this.level == '88') {
            this.setValidation(8, 'Nivel incorrecto para OCCURS');
        }
    }

    addChild(child) {
        this.childs.push(child[0]);
    }

    setDepth(depth) {
        this.depth = depth;
    }

    setValidation(value, tooltip) {
        if (this.level > 0) {
            if (this.validation.level < value) this.validation.level = value;

            switch (this.validation.level) {
                case 0:
                    this.validation.color = 'bg-success';
                    break;
                case 4:
                    this.validation.color = 'bg-warning';
                    break;
                case 8:
                    this.validation.color = 'bg-danger';
                    break;
            }

            const color = this.validation.color;

            let duplicated = false;

            if (this.validation.message.length) duplicated = this.validation.message.map(x => x.tooltip == tooltip).reduce((a, b) => a && b);
            if (!duplicated) this.validation.message.push({ color, tooltip })

        }
    }

    setStart(start) {
        if (this.start == 0 && !this.isOccurs) this.start = start;
    }

    setEnd(end) {
        if (this.end == 0 && !this.isOccurs) this.end = end;
    }
}

function nf(num) {
    if (num.toString().length < 2) {
        return '0' + num;
    } else {
        return num.toString();
    }
}