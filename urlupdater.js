const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

urlConfiguration.addEventListener('change', () => {
    updateURL(textInput, true)}
);

autorunOption.addEventListener('change', () => {
    config.general.autoRunURL = autorunOption.checked;
    updateURL(textInput, true);
});

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
const configInput = urlParams.get("config");

if (urlInput) {
    textInput.value = atob(urlInput);
    if (configInput) {
        config = JSON.parse(configInput);
    }
    if (autorun === 'true') {
        process();
    }else{
        applyConfiguration();
    }
}

function activateURLUpdate() {
    textInput.addEventListener("input", () => updateURL(textInput, true));
}

function deactivateURLUpdate() {
    textInput.removeEventListener("input", updateURL);
}


function updateURL(textInput, keep) {
    let input = textInput.value;
    if (!keep) {
        input = "";
    }
    const parm = encodeToB64(input);
    if (window.history.replaceState) {
        let url = `?input=${parm}&autorun=${autorunOption.checked}`;
        urlConfiguration.checked ? url += `&config=${JSON.stringify(config)}` : false;
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
