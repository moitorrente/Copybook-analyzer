//https://www.ibm.com/support/knowledgecenter/SSEPEK_11.0.0/apsg/src/tpc/db2z_hostvariablecobol.html
//https://www.ibm.com/support/knowledgecenter/SS6SG3_4.2.0/com.ibm.entcobol.doc_4.2/PGandLR/ref/rlddecom.htm

const USAGE = ['BINARY', 'COMP', 'COMP-1', 'COMP-2', 'COMP-3', 'COMP-4', 'COMP-5', 'PACKED-DECIMAL', 'DISPLAY', 'SIGN TRAILING SEPARATE CHARACTER', 'SIGN LEADING SEPARATE CHARACTER'];
const WORDS = [
    //'REDEFINES',
    'OCCURS',
    'PIC',
    'PICTURE',
    //'RENAMES'
    'SIGN',
    'VALUE'
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

    removeSufix() {
        let name = this.name;
        if (this.name) {
            let temp = Array.from(this.name);
            if (temp[temp.length - 1] == ':' && temp[temp.length - 2] == ';' && temp[temp.length - 3] == ':') {
                temp.splice(temp.length - 1);
                temp.splice(temp.length - 1);
                temp.splice(temp.length - 1);
                name = temp.join('');
            }
        }

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
            if (this.usage) {
                this.setValidation(8, `Campo alfanumérico con usage: ${this.usage}`);
            }

        } else {
            if (!USAGE.includes(this.usage) && this.usage) {
                this.setValidation(8, `Usage incorrecto: ${this.usage}`);
                this.usage = '';
            }

            if (usage == 'COMP-3' ||
                usage == 'PACKED-DECIMAL') {
                this.type = 'PD';
                if ((this.integer + this.decimal) % 2 == 0) {
                    this.setValidation(4, 'Packed decimal par')
                }
            }

            if (usage == 'COMP-1' ||
                usage == 'COMP' ||
                usage == 'BINARY' ||
                usage == 'COMP-4') {
                this.type = 'BI';
            }

            if (usage[0] == 'OCCURS') {
                this.isOccurs = true;
                this.setOccurs(usage[1]);
            }

            if (this.usage == 'SIGN TRAILING SEPARATE CHARACTER' ||
                this.usage == 'SIGN LEADING SEPARATE CHARACTER') {
                if (!this.sign) {
                    this.setValidation(8, 'Campo sin signo pero con modificador de signo')
                }
                this.type = 'SFF';
            }
        }

        if (!normalize.checked || this.mask) {
            this.picText = value[0];
        }

        const length = this.getLength();
        this.setLength(length);
    }

    getLength() {
        let length = 0;
        switch (this.type) {
            case 'AN':
                length = this.length;
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
        if (this.validation.level < value) {
            this.validation.level = value;
        }

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

        if (this.validation.message.length) {
            duplicated = this.validation.message.map(x => x.tooltip == tooltip).reduce((a, b) => a && b);
        }

        if (!duplicated) {
            this.validation.message.push({ color, tooltip })
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