const okSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>`;

const warningSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
</svg>`;

const errorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`

const switchThemeChk = document.getElementById("theme-check");

function switchTheme() {
    document.documentElement.classList.toggle('clear-mode');
    document.documentElement.classList.toggle('dark-mode');
};



const fileSelector = document.getElementById('file');
const runButton = document.getElementById('run');
const shareButton = document.getElementById('share');
const csvButton = document.getElementById('csv');
const textInput = document.getElementById('input-text');
const textOutput = document.getElementById('output-text');

const normalize = document.getElementById("normalize");
const expand88 = document.getElementById("expand-88");
const removePrefix = document.getElementById("remove-prefix");
const removeSufix = document.getElementById("remove-sufix");
const sufix = document.getElementById("sufix");
const prefix = document.getElementById("prefix");

const clearButton = document.querySelectorAll(".clear");
const clearOutputButton = document.getElementById("clear-output");

const textInputSize = document.getElementById("input-font-size");
const textInputReset = document.getElementById("input-font-reset");

const textOutputSize = document.getElementById("output-font-size");
const textOutputReset = document.getElementById("output-font-reset");

const inputExpand = document.getElementById("input-expand");
const outputExpand = document.getElementById("output-expand");

const outputType = document.getElementById("output-type-selector");
const urlUpdateInput = document.getElementById("url-update-input");

const autorunOption = document.getElementById("url-autorun");
const urlConfiguration = document.getElementById("url-configuration");





//----------------------------------- De regenerate.js ----------------------------
const levelCol = document.getElementById("level-col");
const depthCol = document.getElementById("depth-col");
const nameCol = document.getElementById("name-col");
const typeCol = document.getElementById("type-col");
const pictureCol = document.getElementById("picture-col");
const modifierCol = document.getElementById("modifier-col");
const startCol = document.getElementById("start-col");
const lengthCol = document.getElementById("length-col");
const endCol = document.getElementById("end-col");
const validationCol = document.getElementById("validation-col");
//----------------------------------- De regenerate.js ----------------------------

const exportConfig = document.getElementById("export-config");
exportConfig.addEventListener("click", () => {
    saveTextAsFile(JSON.stringify(config, null, 2), 'config.json');
});

textInputSize.addEventListener("input", () => {
    textInput.style.fontSize = `${textInputSize.value}px`;
    config.general.inputSize = textInput.style.fontSize;
    updateURL(textInput, true);
});
textOutputSize.addEventListener("input", () => {
    textOutput.style.fontSize = `${textOutputSize.value}px`;
    config.general.outputSize = textOutput.style.fontSize;
    updateURL(textInput, true);
});

textInputReset.addEventListener("click", () => {
    textInput.style.fontSize = `16px`;
    config.general.inputSize = textInput.style.fontSize;
    textInputSize.value = "16";
    updateURL(textInput, true);
});

textOutputReset.addEventListener("click", () => {
    textOutput.style.fontSize = `16px`;
    config.general.outputSize = textOutput.style.fontSize;
    textOutputSize.value = "16";
    updateURL(textInput, true);
});


urlUpdateInput.addEventListener("change", () => {
    toggleAutoUpdate(urlUpdateInput.checked);
});

shareButton.addEventListener("click", share)


runButton.addEventListener('click', process);

csvButton.addEventListener('click', createOuput);

textOutput.addEventListener("input", () => {
    copyButton.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
      class="bi bi-clipboard" viewBox="0 0 16 16">
      <path
        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path
        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>`;
});

outputType.addEventListener('change', process);


let config = {
    "general":{
        "inputSize": "16px",
        "outputSize": "16px",
        "autoUpdateURL": true,
        "autoRunURL": true
    },
    "tabla": {
        "nivel": {
            "show": true,
            "name": "Nivel"
        },
        "profundidad": {
            "show": true,
            "name": "Profundidad"
        },
        "nombre": {
            "show": true,
            "name": "Nombre"
        },
        "tipo": {
            "show": true,
            "name": "Tipo"
        },
        "picture": {
            "show": true,
            "name": "Picture"
        },
        "modificador": {
            "show": true,
            "name": "Modificador"
        },
        "inicio": {
            "show": true,
            "name": "Inicio"
        },
        "longitud": {
            "show": true,
            "name": "Longitud"
        },
        "fin": {
            "show": true,
            "name": "Fin"
        },
        "validacion": {
            "show": true,
            "name": "Validación"
        }
    }
}


function generateTable() {
    document.getElementById('table').innerHTML = '';
    const documentTable = new Table(config.tabla);
    documentTable.create();
    documentTable.append('table');
}


function createOuput() {
    switch (outputType.value) {
        case 'outrec':
            createOutrec();
            break;
        case 'table-md':
            textOutput.value = createMDTable(fullTable);
            break;
        case 'table-csv':
            textOutput.value = createCSVTable(fullTable);
            break;
        case 'table-html':
            textOutput.value = createHTMLTable(document.getElementById("table").innerHTML);
            break;
        case 'json':
            textOutput.value = JSON.stringify(copyFields[0], null, 2);
            break;
        case 'copy-normalized':
            textOutput.value = normalizedCopy(fullTable);
            break;
    }
}

clearButton.forEach(x => {
    x.addEventListener('click', clearAll)
});

clearOutputButton.addEventListener('click', clearOutput);

function clearAll() {
    clearInput();
    clearIntermediate();
    clearOutput();
}


function clearInput() {
    textInput.value = "";
    updateURL(false);
}

function clearOutput() {
    textOutput.value = "";
}

let tableEntries = [];
let fullTable = [];

function clearIntermediate() {
    copyFields = [];
    tableEntries = [];
    fullTable = [];
    occursNames = [];
    let table = document.getElementById("table-body");
    table ? document.getElementById("table-body").innerHTML = null : false;
    start = 1;
    finish = 0;
    id = 0;
}



function recursiveRead(structure, outrec) {
    if (structure.isPic) {
        outrec.push(structure.start);
    }

    if (structure.childs.length > 0) {
        for (let t = 0; t < structure.childs.length; t++) {
            recursiveRead(structure.childs[t], outrec);
        }
    }
}

function applyConfiguration(){
    textInput.style.fontSize = config.general.inputSize;
    textOutput.style.fontSize = config.general.outputSize;
    textInputSize.value = parseInt(config.general.inputSize);
    textOutputSize.value = parseInt(config.general.outputSize);
    
    autorunOption.checked = config.general.autoRunURL;
    urlUpdateInput.checked = config.general.autoUpdateURL;

    levelCol.checked = config.tabla.nivel.show;
    depthCol.checked = config.tabla.profundidad.show;
    nameCol.checked = config.tabla.nombre.show;
    typeCol.checked = config.tabla.tipo.show;
    pictureCol.checked = config.tabla.picture.show;
    modifierCol.checked = config.tabla.modificador.show;
    startCol.checked = config.tabla.inicio.show;
    lengthCol.checked = config.tabla.longitud.show;
    endCol.checked = config.tabla.fin.show;
    validationCol.checked = config.tabla.validacion.show;

    generateTable();

}

function process() {
    clearIntermediate();
    applyConfiguration();

    const text = textInput.value;

    if (text) {
        parse(text);
        createOuput();
    }

}

fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    getAsText(fileList[0]);
});


function getAsText(fileToRead) {
    const reader = new FileReader();
    reader.readAsText(fileToRead);
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

let copyFields = [];
let occursNames = [];
let id = 0;

function loadHandler(event) {
    //parse(event.target.result);
    textInput.value = event.target.result;
}

function errorHandler(evt) {
    if (evt.target.error.name == 'NotReadableError') {
        alert('No se puede leer el fichero');
    } else {
        alert(evt);
    }
}

function parse(text) {
    const raw = text.replaceAll(/\r\n|\n/g, "").split(/\./);
    const lines = raw.map(x => x.split(' '));
    const filtered = lines.map(line => {
        return line.filter(field => field)
    });
    copyFields.push(new Field("00 PLACEHOLDER.", -1));

    filtered.forEach((line, index) => {
        if (line != '' && line[0].charAt(0) != '*') {
            let field = new Field(line, index);

            if (removePrefix.checked && field.name) {
                field.removePrefix(prefix.value);
            }

            if (removeSufix.checked && field.name) {
                field.removeSufix(sufix.value);
            }

            if (field.isOccurs && !field.isPic) {
                occursNames.push({ level: field.level, name: field.name, occurs: field.occurs });
            }

            if (field.isOccurs && field.isPic) {
                for (let i = 0; i < field.occurs; i++) {
                    let newField = new Field();
                    newField.decimal = field.decimal;
                    newField.end = field.end;
                    newField.id = field.id;
                    newField.integer = field.integer;
                    newField.isOccurs = field.isOccurs;
                    newField.occurs = field.occurs
                    newField.isPic = field.isPic;
                    newField.length = field.length;
                    newField.level = field.level;
                    newField.picText = field.picText;
                    newField.sign = field.sign;
                    newField.start = field.start;
                    newField.type = field.type;
                    newField.usage = field.usage;
                    newField.isSwitch = field.isSwitch;
                    newField.name = `${field.name}`
                    copyFields.push(newField);
                }
            } else {
                copyFields.push(field);
            }
        }
    });

    createHierarchy(copyFields);

    occursNames.sort(compare);

    for (let i = 0; i < occursNames.length; i++) {
        let tooccurs = findNode(occursNames[i].name, copyFields[0]);
        expandOccurs(tooccurs, occursNames[i].occurs);
    }

    createRow(copyFields[0], 1);
    recursiveScan(copyFields[0], 0);

    return filtered;
}


function createHierarchy(copyFields) {
    let levels = copyFields.map(x => x.level).sort((a, b) => b - a);

    for (let i = 0; i < copyFields.length; i++) {
        let index = copyFields.findIndex(x => x.level == levels[i]);
        if (index > 0) {
            let child = copyFields[index];
            if (copyFields[index - 1]) {
                child.parent = (copyFields[index - 1].name)
                copyFields[index - 1].addChild(copyFields.splice(index, 1));
            }
        }
    }

    levels = copyFields.map(x => x.level);

    if (levels.length > 1) {
        createHierarchy(copyFields);
    } else {
        return copyFields;
    }
}

function createRow(field, depth) {
    const table = document.getElementById("table-body")
    const row = document.createElement("tr");
    const level = document.createElement("td");
    const depthCol = document.createElement("td");
    const name = document.createElement("td");
    const type = document.createElement("td");
    const usage = document.createElement("td");
    const picture = document.createElement("td");
    const startCol = document.createElement("td");
    const length = document.createElement("td");
    const finishCol = document.createElement("td");
    const validation = document.createElement("td");

    level.innerHTML = field.level;

    name.innerHTML = field.name;
    if (field.type) {
        type.innerHTML = field.type;
    }

    if (field.insideOccurs) {
        depthCol.appendChild(createBadge(depth, "bg-info"))
    } else if (field.isOccurs) {
        depthCol.appendChild(createBadge(depth, "bg-primary"))
    } else {
        depthCol.innerHTML = depth;
    }

    field.usage ? usage.innerHTML = field.usage : usage.innerHTML = "";
    if (field.picText) picture.innerHTML = field.picText;

    if (field.isPic) {
        const entryStart = start;
        startCol.innerHTML = start;
        field.setStart(start);
        length.innerHTML = field.length;
        finish = start + field.length - 1;
        finishCol.innerHTML = finish;
        start = finish + 1;
        const entryEnd = finish;
        field.setEnd(finish);

        const entry = new Entry(depth, field.level, field.name, field.type, field.picText, entryStart, entryEnd, field.length, field.usage, field.integer, field.decimal, field.sign, field.isPic, field.isOccurs, field.occurs);
        if (field.level != "00") {
            tableEntries.push(entry);
            fullTable.push(entry);
        }
    } else {
        if (field.level != "00") {
            fullTable.push(new Entry(depth, field.level, field.name, field.type, '', '', '', '', field.usage, '', '', '', '', field.isOccurs, field.occurs));
        }
    }

    const validationBadge = createBadge("", field.validation.color, field.validation.level)

    validation.setAttribute("data-container", "body");

    if (field.validation.level > 0) {
        validation.setAttribute("data-bs-toggle", "collapse");
        validation.setAttribute("data-bs-target", `#toggleHelp${field.id}`);
        validationBadge.classList.add("button");
    }
    validation.appendChild(validationBadge);

    if (!field.isSwitch) {
        config.tabla.nivel.show ? row.appendChild(level) : false;
        config.tabla.profundidad.show ? row.appendChild(depthCol) : false;
        config.tabla.nombre.show ? row.appendChild(name) : false;
        config.tabla.tipo.show ? row.appendChild(type) : false;
        config.tabla.picture.show ? row.appendChild(picture) : false;
        config.tabla.modificador.show ? row.appendChild(usage) : false;
        config.tabla.inicio.show ? row.appendChild(startCol) : false;
        config.tabla.longitud.show ? row.appendChild(length) : false;
        config.tabla.fin.show ? row.appendChild(finishCol) : false;
        config.tabla.validacion.show ? row.appendChild(validation) : false;

        if (field.level != 0) {
            table.appendChild(row);
        }
    } else {
        config.tabla.nivel.show ? row.appendChild(level) : false;
        config.tabla.profundidad.show ? row.appendChild(depthCol) : false;
        config.tabla.nombre.show ? row.appendChild(name) : false;
        let value = document.createElement("td");
        value.colSpan = 6;
        value.innerHTML = field.value;
        row.appendChild(value)
        row.appendChild(validation);
    }

    if (field.validation.level > 0) {
        for (let i = 0; i < field.validation.message.length; i++) {
            const firstDiv = document.createElement("tr");
            firstDiv.classList.add("collapse");
            firstDiv.classList.add("alert");

            if (field.validation.message[i].color == "bg-warning") {
                firstDiv.classList.add("alert-warning");
            } else {
                firstDiv.classList.add("alert-danger");
            }

            firstDiv.id = `toggleHelp${field.id}`;
            const secondDiv = document.createElement("td");
            secondDiv.innerHTML = `<strong>${field.validation.message[i].tooltip}</strong>`;

            secondDiv.setAttribute("colspan", "10")

            firstDiv.appendChild(secondDiv);
            table.appendChild(firstDiv);
        }
    }

    if (field.isSwitch) {
        row.classList.add("collapse");
        row.classList.add("alert-secondary");
        row.id = `toggleSwitch`;
        table.appendChild(row);
    }
}

function createBadge(text, color, level) {
    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.classList.add(color);

    if (level != undefined) {
        switch (level) {
            case 0:
                text = okSVG;
                break;
            case 4:
                text = warningSVG;
                break;
            case 8:
                text = errorSVG;
        }
    }

    badge.innerHTML = text;
    return badge;
}

let start = 1;
let finish = 0;

function findNode(search, currentNode) {
    var i,
        currentChild,
        result;

    if (search == currentNode.name) {
        return currentNode;
    } else {
        for (i = 0; i < currentNode.childs.length; i++) {
            currentChild = currentNode.childs[i];
            result = findNode(search, currentChild);
            if (result !== false) {
                return result;
            }
        }
        return false;
    }
}

function recursiveScan(structure, depth) {
    if (structure.name != null) {
        if (structure.childs.length > 0) {
            depth++;
            for (let t = 0; t < structure.childs.length; t++) {
                createRow(structure.childs[t], depth)
                recursiveScan(structure.childs[t], depth);
            }
        }
    }
    return true;
}

function compare(a, b) {
    if (a.level < b.level) {
        return -1;
    }
    if (a.level > b.level) {
        return 1;
    }
    return 0;
}

function expandOccurs(structure, occurs) {
    const repeated = new Array(occurs).fill(structure.childs).flat();
    repeated.forEach(x => x.insideOccurs = true);
    structure.childs = repeated;
    return structure;
}

function parsePIC(inputPicture) {
    let picture = Array.from(inputPicture);
    const first = picture[0];
    const numbers = returnNumericValues(inputPicture);

    let pic = {};

    switch (first) {
        case 'X':
            pic.type = 'AN';
            pic.sign = false;
            [pic.length] = numbers;
            pic.picText = `X(${nf(pic.length)})`
            break;
        case '9':
            pic.type = 'ZD';
            pic.sign = false;
            [pic.integer, pic.decimal] = numbers;
            if (pic.decimal == 0) {
                pic.picText = `9(${nf(pic.integer)})`;
            } else {
                pic.picText = `9(${nf(pic.integer)})V9(${nf(pic.decimal)})`;
            }
            break;
        case 'S':
            pic.type = 'ZD';
            pic.sign = true;
            [pic.integer, pic.decimal] = numbers;
            if (pic.decimal == 0) {
                pic.picText = `S9(${nf(pic.integer)})`;
            } else {
                pic.picText = `S9(${nf(pic.integer)})V9(${nf(pic.decimal)})`;
            }
            break;
        case 'Z':
        case '-':
        case '+':
            pic.type = 'ZD';
            pic.mask = true;
            [pic.integer, pic.decimal] = numbers;
            break;
        default:
            pic.type = inputPicture;
    }

    return pic;
}

function returnNumericValues(picture) {
    let pictures = [picture];

    if (picture.includes(',')) {
        const integer = picture.length;
        const decimal = 0;
        return [integer, decimal];
    }

    if (picture.includes('V')) {
        pictures = picture.split('V');
    }

    let first, second;
    [first, second = ''] = pictures;

    firstArray = Array.from(first);
    secondArray = Array.from(second);

    let integer = 0;
    let decimal = 0;

    if (firstArray.filter(x => x == '(' || x == ')') != '') {
        integer = countWithPar(firstArray);
    } else {
        integer = countExact(firstArray);
    }

    if (secondArray.length) {
        if (secondArray.filter(x => x == '(' || x == ')') != '') {
            decimal = countWithPar(secondArray);
        } else {
            decimal = countExact(secondArray);
        }
    }
    return [integer, decimal];
}

function countWithPar(picture) {
    let startIndex = 0;
    let endIndex = 0;
    let tempValue = [];

    for (let i = 0; i < picture.length; i++) {
        if (picture[i] == '(') {
            startIndex = i;
        }
        if (picture[i] == ')') {
            endIndex = i;
        }
    }

    for (let i = startIndex + 1; i < endIndex; i++) {
        tempValue.push(picture[i]);
    }

    return (parseInt(tempValue.join('')));
}

function countExact(picture) {
    let counter = 1;

    for (let i = 0; i < picture.length; i++) {
        if (picture[i] == picture[i + 1]) {
            if (picture[i] == 'X' || picture[i] == '9' || picture[i] == 'Z') {
                counter++
            }
        }
    }
    return counter;
}

const downloadFileName = document.getElementById("download-name")
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", () => {
    let extension;

    switch (outputType.value) {
        case 'outrec':
            extension = "txt"
            break;
        case 'table-md':
            extension = "md"
            break;
        case 'table-csv':
            extension = "csv"
            break;
        case 'table-html':
            extension = "html"
            break;
        case 'json':
            extension = "json"
            break;
    }

    saveTextAsFile(textOutput.value, `${downloadFileName.value}.${extension}`);
})

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    let textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

const copyButton = document.getElementById("copy-button");
const copyInputButton = document.getElementById("copy-input-button");
copyButton.addEventListener("click", copyOutput);
copyInputButton.addEventListener("click", copyInput);

function copyOutput() {

    navigator.clipboard.writeText(textOutput.value);
    copyButton.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
    </svg>`;

    setTimeout(() => copyButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
    class="bi bi-clipboard" viewBox="0 0 16 16">
    <path
      d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
    <path
      d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
  </svg>
    
    `, 1500);
}

function copyInput() {
    navigator.clipboard.writeText(urlShare.value);

    copyInputButton.innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>`;

}

//-----------------------------------------------------



var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for (var i = 0; i < count; i++) {
    textareas[i].onkeydown = function (e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            let s = this.selectionStart;
            this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s + 1;
        }
    }
}

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
})

//---------------------------------------------------------

const urlShare = document.getElementById("url-share");
urlShare.value = window.location.href;
function share() {
    if (navigator.share) {
        navigator.share({
            title: 'Compartir URL',
            url: window.location.href
        })
    } else {
        let parm = encodeToB64(textInput.value);
        window.history.replaceState({}, null, `?input=${parm}`)
        urlShare.value = window.location.href;
    }
}