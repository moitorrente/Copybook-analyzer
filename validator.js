const VALID_CHARS = [
    "9", "A", "B", "P", "S", "V", "X", "Z", "/", ",", ".", "+", "-", "CR", "DB", "(", ")",
    "0", "1", "2", "3", "4", "5", "6", "7", "8"
];

//Valida que todos los carácteres de un string se encuentren dentro de una lista de valores
function validateChars(text, list) {
    const arrText = Array.from(text);
    const validation = arrText.map(char => {
        const tempVal = list.map(valid => {
            if (char == valid) {
                return true;
            }
            return false;
        }).reduce((acc, x) => x || acc);
        return tempVal;
    })//.reduce((acc, x) => x && acc);

    let errors = validation.map((x, index) => {
        if(!x){
            return arrText[index];
        }
        
    }).filter(x => x);

    return [validation.reduce((acc, x ) => acc && x), errors];
}

function countChars(text, char) {
    const arrText = Array.from(text);
    return arrText.reduce((acc, x) => { if (x == char) { acc++ } return acc }, 0);
}

function validateParenthesis(text){
    const close = countChars(text, ")");
    const open = countChars(text, "(");
    const total = open + close;

    if(open != close){
        return false;
    }
    if(open > 2 || close > 2){
        return false
    }

    if(total != 2 && total !=4 && total != 0){
        return false;
    }

    return true;
}