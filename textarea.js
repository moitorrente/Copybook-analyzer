const keymap = {
    '(': { value: '().', pos: 1 },
    '\'': { value: '\'\'', pos: 1 }
};

const lockedSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
class="bi bi-lock-fill" viewBox="0 0 16 16">
<path
  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
</svg>`;

const unlockedSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
</svg>`;

const lockButton = document.getElementById('lock-button');

lockButton.addEventListener('click', () => {
    if (textOutput.readOnly == true) {
        textOutput.readOnly = false;
        lockButton.innerHTML = lockedSVG;
    } else {
        textOutput.readOnly = true;
        lockButton.innerHTML = unlockedSVG;
    }
});

const textareas = document.getElementsByTagName('textarea');
for (let i = 0; i < textareas.length; i++) {
    textareas[i].onkeydown = function (e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            let s = this.selectionStart;
            this.value = this.value.substring(0, this.selectionStart) + '\t' + this.value.substring(this.selectionEnd);
            this.selectionEnd = s + 1;
        }
    }
}

textInput.addEventListener('keydown', (e) => {
    if (keymap[e.key]) {
        e.preventDefault();
        const pos = textInput.selectionStart;
        textInput.value = textInput.value.slice(0, pos) +
            keymap[e.key].value +
            textInput.value.slice(textInput.selectionEnd);

        textInput.selectionStart = textInput.selectionEnd = pos + keymap[event.key].pos;
    }
});