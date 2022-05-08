export default class Key {
  constructor({ code, langKey, currentLang }) {
    this.code = code;
    this.langKey = langKey;
    this.currentLang = currentLang;
  }

  getKeySymbol(modificator) {
    if (this.langKey[this.currentLang].icon) {
      return this.langKey[this.currentLang].icon;
    }
    if (modificator && this.langKey[this.currentLang].symbol) {
      return this.langKey[this.currentLang].symbol;
    }
    if (modificator && modificator.shiftKey) {
      return this.langKey[this.currentLang].shiftKey;
    }
    if (modificator && modificator.capsLock) {
      return this.langKey[this.currentLang].key.toUpperCase();
    }
    return this.langKey[this.currentLang].key;
  }

  changeLanguage(lang) {
    this.currentLang = lang;
    this.keyEl.querySelector('.key__main').innerHTML = this.getKeySymbol();
  }

  createButton() {
    this.keyEl = document.createElement('button');
    this.keyEl.classList.add('keyboard__key', 'key', `key--${this.code.toLowerCase()}`);
    this.keyEl.innerHTML = `<span class="key__main">${this.getKeySymbol()}</span>`;
    this.keyEl.keyObj = this;
    return this.keyEl;
  }

  setText(text) {
    this.keyEl.innerHTML = `<span class="key__main">${text}</span>`;
  }

  setAnimation(animation) {
    this.animation = animation;
  }

  getAnimation() {
    return this.animation;
  }
}
