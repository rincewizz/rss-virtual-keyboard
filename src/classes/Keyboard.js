import Key from './Key';

export default class Keyboard {
  constructor({ layout, langs }) {
    this.layout = layout;
    this.keys = {};
    this.langs = langs;
    this.currentLang = 'en';
    this.capsLock = false;

    // this.render();
    document.body.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.body.addEventListener('keyup', this.keyUpHandler.bind(this));
  }

  render() {
    this.textareaEl = document.createElement('textarea');
    this.textareaEl.classList.add('textarea');
    this.keyboardEl = document.createElement('div');
    this.keyboardEl.classList.add('keyboard');
    document.body.append(this.textareaEl);
    document.body.append(this.keyboardEl);
    for (let i = 0; i < this.layout.length; i += 1) {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      this.keyboardEl.append(row);
      for (let j = 0; j < this.layout[i].length; j += 1) {
        const code = this.layout[i][j];
        const langKey = { en: this.langs.en[code], ru: this.langs.ru[code] };
        const key = new Key({ code, langKey });
        this.keys[code] = key;
        // row.insertAdjacentHTML('beforeend', keyboardKey.getHtml());
        row.append(key.createButton());
      }
    }
  }

  keyDownHandler(e) {
    console.log(e);
    // this.textareaEl.value += this.keys[e.code].getKeySymbol(e.shiftKey);
    this.pressKey(this.keys[e.code], e);
    // e.preventDefault();
  }

  keyUpHandler(e) {
    this.unpressKey(this.keys[e.code], e);
  }

  pressKey(keyObj, e) {
    // console.log(keyObj.langKey[this.currentLang].key);
    if (!['Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock'].includes(keyObj.langKey[this.currentLang].key) && !e.ctrlKey) {
      const modificator = {
        capsLock: this.capsLock,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
      };
      this.textareaEl.value += keyObj.getKeySymbol(modificator);

      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'CapsLock'
      || keyObj.langKey[this.currentLang].key === 'Shift') {
      this.switchUpperCase(keyObj.langKey[this.currentLang].key);
    }
  }

  unpressKey(keyObj, e) {
    if (keyObj.langKey[this.currentLang].key === 'Shift') {
      this.shift = false;
    }
    this.switchUpperCase(false);
  }

  switchUpperCase(upper) {
    if (upper === 'CapsLock') {
      this.capsLock = !this.capsLock;
    }
    if (upper === 'Shift') {
      this.shift = true;
    }
    Object.values(this.keys).forEach((key) => {
      if (key.langKey[this.currentLang].shiftKey) {
        if (this.shift) {
          key.setText(key.langKey[this.currentLang].shiftKey);
        } else if (this.capsLock) {
          key.setText(key.langKey[this.currentLang].key.toUpperCase());
        } else {
          key.setText(key.langKey[this.currentLang].key);
        }
      }
    });
  }
}
