const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

urlConfiguration.addEventListener('change', () => {
    updateURL()
}
);

autorunOption.addEventListener('change', () => {
    config.general.autoRunURL = autorunOption.checked;
    updateURL();
});

function toggleAutoUpdate(updateURL) {
    if (updateURL) {
        activateURLUpdate();
    } else {
        deactivateURLUpdate();
    }
}

const urlInput = urlParams.get('input');
const autorun = urlParams.get('autorun');
const configInput = urlParams.get('config');

if (urlInput) {
    textInput.value = atob(urlInput);
    if (configInput) {
        config = JSON.parse(configInput);
    }
    if (autorun === 'true') {
        process();
    } else {
        applyConfiguration();
    }
}

function activateURLUpdate() {
    textInput.addEventListener('input', updateURL);
    textInput.addEventListener('input', generateURL);
    updateURL();
}

function deactivateURLUpdate() {
    textInput.removeEventListener('input', updateURL);
    window.history.replaceState({}, null, '/');
}

function updateURL() {
    const url = generateURL();

    if (window.history.replaceState) {
        window.history.replaceState({}, null, url);
    }
}

function generateURL() {
    const input = document.getElementById('input-text').value;
    const parm = encodeToB64(input);
    let url = `?input=${parm}&autorun=${autorunOption.checked}`;
    urlConfiguration.checked ? url += `&config=${JSON.stringify(config)}` : false;
    urlShare.value = window.location.href + url;
    return url;
}

function encodeToB64(message) {
    let encoded = btoa(message);
    encoded = encoded.replaceAll('=', '')
    encoded = encoded.replaceAll('+', '');
    encoded = encoded.replaceAll('/', '');
    return encoded;
}
