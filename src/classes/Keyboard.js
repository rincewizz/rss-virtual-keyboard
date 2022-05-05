import Key from './Key';

export default class Keyboard {
  constructor({ layout, langs }) {
    this.layout = layout;
    this.keys = {};
    this.langs = langs;
    this.currentLang = 'en';

    // this.render();
    document.body.addEventListener('keydown', this.keyDownHandler.bind(this));
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
    this.textareaEl.value += this.keys[e.code].getKeySymbol(e.shiftKey);
    e.preventDefault();
  }
}
