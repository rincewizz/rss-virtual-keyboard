import Key from './Key';

export default class Keyboard {
  constructor({ layout, langs }) {
    this.layout = layout;
    this.keys = {};
    this.langs = langs;
    this.currentLang = 'en';
    this.capsLock = false;
  }

  getLangSettings() {
    const lang = localStorage.getItem('lang');
    if (lang) {
      return lang;
    }
    return this.currentLang;
  }

  setLangSettings(lang) {
    localStorage.setItem('lang', lang);
    this.currentLang = lang;
  }

  init() {
    this.currentLang = this.getLangSettings();
    this.render();
    document.body.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.body.addEventListener('keyup', this.keyUpHandler.bind(this));
    this.keyboardEl.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    this.keyboardEl.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    this.keyboardEl.addEventListener('mouseleave', this.mouseLeaveHandler.bind(this));
  }

  render() {
    this.title = document.createElement('h1');
    this.title.innerHTML = 'Virtual Keyboard';
    document.body.append(this.title);
    this.textareaEl = document.createElement('textarea');
    this.textareaEl.setAttribute('rows', 15);
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
        const key = new Key({ code, langKey, currentLang: this.currentLang });
        this.keys[code] = key;
        row.append(key.createButton());
      }
    }
    this.osInfo = document.createElement('div');
    this.changeLangInfo = document.createElement('div');
    document.body.append(this.osInfo);
    document.body.append(this.changeLangInfo);
    this.osInfo.outerHTML = '<div class="os-info">Клавиатура создана в операционной системе Arch Linux</div>';
    this.changeLangInfo.outerHTML = '<div class="change-lang-info">Для переключения языка: <b>Ctrl + Alt</b></div>';
  }

  keyDownHandler(e) {
    if (this.keys[e.code]) {
      this.pressKey(this.keys[e.code], e);
    }
  }

  keyUpHandler(e) {
    if (this.keys[e.code]) {
      this.unpressKey(this.keys[e.code], e);
    }
  }

  mouseDownHandler(e) {
    const key = e.target.closest('.key');
    if (key) {
      this.mouseTarget = key;
      this.pressKey(key.keyObj, e);

      if (!['Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock'].includes(key.keyObj.langKey[this.currentLang].key)) {
        const repeater = () => {
          this.timerRepeater = setTimeout(() => {
            this.pressKey(key.keyObj, e);
            repeater();
          }, 35);
        };
        this.timerDelay = setTimeout(repeater, 500);
      }
    }
  }

  mouseUpHandler(e) {
    this.mouseUnpress(e);
  }

  mouseLeaveHandler(e) {
    this.mouseUnpress(e);
  }

  mouseUnpress(e) {
    const key = this.mouseTarget;
    if (key) {
      this.unpressKey(key.keyObj, e);
      clearTimeout(this.timerDelay);
      clearTimeout(this.timerRepeater);
    }
  }

  pressKey(keyObj, e) {
    this.textareaEl.focus();

    if (!keyObj.keyEl.classList.contains('key--active')) {
      keyObj.keyEl.classList.add('key--active');
      keyObj.setAnimation(true);

      const transitionendHandler = (event) => {
        if (event.pseudoElement === '::before') {
          if (keyObj.keyEl.classList.contains('key--active')) {
            keyObj.setAnimation(false);
          }
          keyObj.keyEl.removeEventListener('transitionend', transitionendHandler);
        }
      };

      keyObj.keyEl.addEventListener('transitionend', transitionendHandler);
    }
    const modificator = {
      capsLock: this.capsLock,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
    };
    const spetialKeys = ['Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock', 'Delete', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (!spetialKeys.includes(keyObj.langKey[this.currentLang].key) && !e.ctrlKey) {
      this.printText(keyObj.getKeySymbol(modificator));

      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'CapsLock'
      || keyObj.langKey[this.currentLang].key === 'Shift') {
      if (keyObj.langKey[this.currentLang].key === 'CapsLock') {
        if (this.capsLock) {
          keyObj.keyEl.classList.remove('key--on');
        } else {
          keyObj.keyEl.classList.add('key--on');
        }
      }
      this.switchUpperCase(keyObj.langKey[this.currentLang].key);
    }
    if (keyObj.langKey[this.currentLang].key === 'Ctrl' || keyObj.langKey[this.currentLang].key === 'Alt') {
      if (modificator.ctrlKey && modificator.altKey) {
        this.changeLanguage();
      }
    }
    if (keyObj.langKey[this.currentLang].key === 'Delete') {
      const { selectionStart } = this.textareaEl;
      let { selectionEnd } = this.textareaEl;
      if (selectionStart === selectionEnd) {
        selectionEnd += 1;
      }
      this.textareaEl.setRangeText('', selectionStart, selectionEnd, 'start');
      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'Backspace') {
      let { selectionStart } = this.textareaEl;
      const { selectionEnd } = this.textareaEl;
      if (selectionStart === selectionEnd && selectionStart > 0) { selectionStart -= 1; }
      this.textareaEl.setRangeText('', selectionStart, selectionEnd, 'start');
      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'ArrowLeft') {
      if (this.textareaEl.selectionStart > 0) {
        this.textareaEl.selectionStart -= 1;
        this.textareaEl.selectionEnd = this.textareaEl.selectionStart;
      }
      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'ArrowRight') {
      this.textareaEl.selectionStart += 1;
      this.textareaEl.selectionEnd = this.textareaEl.selectionStart;
      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'ArrowDown') {
      const rows = this.textareaEl.value.split('\n');
      const { selectionStart } = this.textareaEl;
      let cursorRow = 0;
      let cursorRowPosition = selectionStart;
      let nextPosition = 0;

      for (let i = 0; i < rows.length; i += 1) {
        nextPosition += rows[i].length;
        if (rows[i].length >= cursorRowPosition) {
          cursorRow = i;
          break;
        }
        cursorRowPosition -= rows[i].length + 1;
      }
      if (rows[cursorRow + 1] === undefined) {
        nextPosition = this.textareaEl.value.length;
      } else if (cursorRowPosition <= rows[cursorRow + 1].length) {
        nextPosition += cursorRowPosition + cursorRow + 1;
      } else {
        nextPosition += rows[cursorRow + 1].length + cursorRow + 1;
      }

      this.textareaEl.selectionStart = nextPosition;
      this.textareaEl.selectionEnd = nextPosition;
      e.preventDefault();
    }
    if (keyObj.langKey[this.currentLang].key === 'ArrowUp') {
      const rows = this.textareaEl.value.split('\n');
      const { selectionStart } = this.textareaEl;
      let cursorRow = 0;
      let cursorRowPosition = selectionStart;
      let nextPosition = 0;

      for (let i = 0; i < rows.length; i += 1) {
        if (rows[i].length >= cursorRowPosition) {
          cursorRow = i;
          break;
        }
        nextPosition += rows[i].length;
        cursorRowPosition -= rows[i].length + 1;
      }
      if (rows[cursorRow - 1] === undefined) {
        nextPosition = 0;
      } else if (cursorRowPosition <= rows[cursorRow - 1].length) {
        nextPosition += -rows[cursorRow - 1].length + cursorRowPosition + cursorRow - 1;
      } else {
        nextPosition += cursorRow - 1;
      }

      this.textareaEl.selectionStart = nextPosition;
      this.textareaEl.selectionEnd = nextPosition;
      e.preventDefault();
    }
  }

  unpressKey(keyObj) {
    if (keyObj.keyEl.classList.contains('key--active') && !keyObj.animation) {
      keyObj.keyEl.classList.remove('key--active');
    } else if (keyObj.keyEl.classList.contains('key--active') && keyObj.animation) {
      const transitionendHandler = (event) => {
        if (event.pseudoElement === '::before') {
          if (keyObj.keyEl.classList.contains('key--active')) {
            keyObj.keyEl.classList.remove('key--active');
            keyObj.setAnimation(false);
          }
          keyObj.keyEl.removeEventListener('transitionend', transitionendHandler);
        }
      };
      keyObj.keyEl.addEventListener('transitionend', transitionendHandler);
    }

    if (keyObj.langKey[this.currentLang].key === 'Shift') {
      this.shift = false;
    }
    if (keyObj.langKey[this.currentLang].key === 'Shift') {
      this.switchUpperCase(false);
    }
  }

  printText(text) {
    const { selectionStart, selectionEnd } = this.textareaEl;
    this.textareaEl.setRangeText(text, selectionStart, selectionEnd, 'end');
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

  changeLanguage() {
    if (this.currentLang === 'en') {
      this.setLangSettings('ru');
    } else {
      this.setLangSettings('en');
    }
    const spetialKeys = ['Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock', 'Delete', 'Backspace', 'ArrowUp', 'Tab', 'Enter'];
    Object.values(this.keys).forEach((key) => {
      let modificator = '';
      if (!spetialKeys.includes(key.langKey[this.currentLang].key)) {
        modificator = { capsLock: this.capsLock };
      }
      key.changeLanguage(this.currentLang, modificator);
    });
  }
}
