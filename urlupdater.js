const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

autorunOption.addEventListener('change', () => updateURL(textInput, true));

activateURLUpdate();

function toggleAutoUpdate(updateURL) {
    if (updateURL) {
        activateURLUpdate();
    } else {
        deactivateURLUpdate();
    }
}

const urlInput = urlParams.get("input");
const autorun = urlParams.get("autorun");

if (urlInput){
    textInput.value = atob(urlInput);
    if(autorun === 'true'){
        process();
    }
}

function activateURLUpdate() {
    textInput.addEventListener("input", () => updateURL(textInput, true));
    textInputExpanded.addEventListener("input", () => updateURL(textInput, true));
}

function deactivateURLUpdate() {
    textInput.removeEventListener("input", updateURL);
    textInputExpanded.removeEventListener("input", updateURL);
}


function updateURL(textInput, keep) {
    let input = textInput.value;
    if(!keep){
        input = "";
    }
    const parm = encodeToB64(input);
    if (window.history.replaceState) {
        const url = `?input=${parm}&autorun=${autorunOption.checked}`;
        window.history.replaceState({}, null, url);
    }
    urlShare.value = window.location.href;
}

function encodeToB64(message) {
    let encoded = btoa(message);
    encoded = encoded.replaceAll("=", "")
    encoded = encoded.replaceAll("+", "");
    encoded = encoded.replaceAll("/", "");
    return encoded;
}
