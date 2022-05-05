export default class Key {
  constructor({ code, langKey }) {
    this.code = code;
    this.langKey = langKey;
    this.currentLang = 'en';
    // this.key = key;
    // this.shiftKey = shiftKey;
  }

  getKeySymbol(shift) {
    if (shift) {
      return this.langKey[this.currentLang].shiftKey;
    }
    return this.langKey[this.currentLang].key;
  }

  getHtml() {
    return `<button class="keyboard__key key">${this.getKeySymbol()}</button>`;
  }

  createButton() {
    this.keyEl = document.createElement('button');
    this.keyEl.classList.add('keyboard__key', 'key');
    this.keyEl.innerHTML = this.getKeySymbol();
    this.keyEl.keyObj = this;
    return this.keyEl;
  }
}
