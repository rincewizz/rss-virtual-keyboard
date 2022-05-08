/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/styles/style.css":
/*!*********************************!*\
  !*** ./assets/styles/style.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./assets/styles/style.css?");

/***/ }),

/***/ "./classes/Key.js":
/*!************************!*\
  !*** ./classes/Key.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Key)\n/* harmony export */ });\nclass Key {\n  constructor({ code, langKey, currentLang }) {\n    this.code = code;\n    this.langKey = langKey;\n    this.currentLang = currentLang;\n    // this.key = key;\n    // this.shiftKey = shiftKey;\n  }\n\n  getKeySymbol(modificator) {\n    if (this.langKey[this.currentLang].icon) {\n      return this.langKey[this.currentLang].icon;\n    }\n    if (modificator && this.langKey[this.currentLang].symbol) {\n      return this.langKey[this.currentLang].symbol;\n    }\n    if (modificator && modificator.shiftKey) {\n      return this.langKey[this.currentLang].shiftKey;\n    }\n    if (modificator && modificator.capsLock) {\n      return this.langKey[this.currentLang].key.toUpperCase();\n    }\n    return this.langKey[this.currentLang].key;\n  }\n\n  changeLanguage(lang) {\n    this.currentLang = lang;\n    this.keyEl.querySelector('.key__main').innerHTML = this.getKeySymbol();\n  }\n\n  createButton() {\n    this.keyEl = document.createElement('button');\n    this.keyEl.classList.add('keyboard__key', 'key', `key--${this.code.toLowerCase()}`);\n    this.keyEl.innerHTML = `<span class=\"key__main\">${this.getKeySymbol()}</span>`;\n    this.keyEl.keyObj = this;\n    return this.keyEl;\n  }\n\n  setText(text) {\n    this.keyEl.innerHTML = `<span class=\"key__main\">${text}</span>`;\n  }\n}\n\n\n//# sourceURL=webpack:///./classes/Key.js?");

/***/ }),

/***/ "./classes/Keyboard.js":
/*!*****************************!*\
  !*** ./classes/Keyboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Keyboard)\n/* harmony export */ });\n/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ \"./classes/Key.js\");\n\n\nclass Keyboard {\n  constructor({ layout, langs }) {\n    this.layout = layout;\n    this.keys = {};\n    this.langs = langs;\n    this.currentLang = 'en';\n    this.capsLock = false;\n  }\n\n  getLangSettings() {\n    const lang = localStorage.getItem('lang');\n    if (lang) {\n      return lang;\n    }\n    return this.currentLang;\n  }\n\n  setLangSettings(lang) {\n    localStorage.setItem('lang', lang);\n    this.currentLang = lang;\n  }\n\n  init() {\n    this.currentLang = this.getLangSettings();\n    this.render();\n    document.body.addEventListener('keydown', this.keyDownHandler.bind(this));\n    document.body.addEventListener('keyup', this.keyUpHandler.bind(this));\n    this.keyboardEl.addEventListener('mousedown', this.mouseDownHandler.bind(this));\n    this.keyboardEl.addEventListener('mouseup', this.mouseUpHandler.bind(this));\n    this.keyboardEl.addEventListener('mouseleave', this.mouseLeaveHandler.bind(this));\n  }\n\n  render() {\n    this.title = document.createElement('h1');\n    this.title.innerHTML = 'Virtual Keyboard';\n    document.body.append(this.title);\n    this.textareaEl = document.createElement('textarea');\n    this.textareaEl.setAttribute('rows', 15);\n    this.textareaEl.classList.add('textarea');\n    this.keyboardEl = document.createElement('div');\n    this.keyboardEl.classList.add('keyboard');\n    document.body.append(this.textareaEl);\n    document.body.append(this.keyboardEl);\n    for (let i = 0; i < this.layout.length; i += 1) {\n      const row = document.createElement('div');\n      row.classList.add('keyboard__row');\n      this.keyboardEl.append(row);\n      for (let j = 0; j < this.layout[i].length; j += 1) {\n        const code = this.layout[i][j];\n        const langKey = { en: this.langs.en[code], ru: this.langs.ru[code] };\n        const key = new _Key__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ code, langKey, currentLang: this.currentLang });\n        this.keys[code] = key;\n        // row.insertAdjacentHTML('beforeend', keyboardKey.getHtml());\n        row.append(key.createButton());\n      }\n    }\n    this.osInfo = document.createElement('div');\n    this.changeLangInfo = document.createElement('div');\n    document.body.append(this.osInfo);\n    document.body.append(this.changeLangInfo);\n    this.osInfo.outerHTML = '<div class=\"os-info\">Клавиатура создана в операционной системе Arch Linux</div>';\n    this.changeLangInfo.outerHTML = '<div class=\"change-lang-info\">Для переключения языка: <b>Ctrl + Alt</b></div>';\n  }\n\n  keyDownHandler(e) {\n    console.log(e);\n    if (this.keys[e.code]) {\n      this.pressKey(this.keys[e.code], e);\n    }\n  }\n\n  keyUpHandler(e) {\n    if (this.keys[e.code]) {\n      this.unpressKey(this.keys[e.code], e);\n    }\n  }\n\n  mouseDownHandler(e) {\n    const key = e.target.closest('.key');\n    if (key) {\n      this.mouseTarget = key;\n      this.pressKey(key.keyObj, e);\n\n      if (!['Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock'].includes(key.keyObj.langKey[this.currentLang].key)) {\n        const repeater = () => {\n          this.timerRepeater = setTimeout(() => {\n            this.pressKey(key.keyObj, e);\n            repeater();\n          }, 35);\n        };\n        this.timerDelay = setTimeout(repeater, 500);\n      }\n    }\n  }\n\n  mouseUpHandler(e) {\n    this.mouseUnpress(e);\n  }\n\n  mouseLeaveHandler(e) {\n    this.mouseUnpress(e);\n  }\n\n  mouseUnpress(e) {\n    const key = this.mouseTarget;\n    if (key) {\n      this.unpressKey(key.keyObj, e);\n      clearTimeout(this.timerDelay);\n      clearTimeout(this.timerRepeater);\n    }\n  }\n\n  pressKey(keyObj, e) {\n    this.textareaEl.focus();\n\n    if (!keyObj.keyEl.classList.contains('key--active')) {\n      keyObj.keyEl.classList.add('key--active');\n      keyObj.animation = true;\n\n      const transitionendHandler = (e) => {\n        if (e.pseudoElement === '::before') {\n          if (keyObj.keyEl.classList.contains('key--active')) {\n            keyObj.animation = false;\n          }\n          keyObj.keyEl.removeEventListener('transitionend', transitionendHandler);\n        }\n      };\n\n      keyObj.keyEl.addEventListener('transitionend', transitionendHandler);\n    }\n    const modificator = {\n      capsLock: this.capsLock,\n      shiftKey: e.shiftKey,\n      metaKey: e.metaKey,\n      altKey: e.altKey,\n      ctrlKey: e.ctrlKey,\n    };\n    const spetialKeys = ['Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock', 'Delete', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];\n    if (!spetialKeys.includes(keyObj.langKey[this.currentLang].key) && !e.ctrlKey) {\n      this.printText(keyObj.getKeySymbol(modificator));\n\n      e.preventDefault();\n    }\n    if (keyObj.langKey[this.currentLang].key === 'CapsLock'\n      || keyObj.langKey[this.currentLang].key === 'Shift') {\n      if (keyObj.langKey[this.currentLang].key === 'CapsLock') {\n        if (this.capsLock) {\n          keyObj.keyEl.classList.remove('key--on');\n        } else {\n          keyObj.keyEl.classList.add('key--on');\n        }\n      }\n      this.switchUpperCase(keyObj.langKey[this.currentLang].key);\n    }\n    if (keyObj.langKey[this.currentLang].key === 'Ctrl' || keyObj.langKey[this.currentLang].key === 'Alt') {\n      if (modificator.ctrlKey && modificator.altKey) {\n        this.changeLanguage();\n      }\n    }\n    if (keyObj.langKey[this.currentLang].key === 'Delete') {\n      const { selectionStart } = this.textareaEl;\n      let { selectionEnd } = this.textareaEl;\n      if (selectionStart === selectionEnd) {\n        selectionEnd += 1;\n      }\n      this.textareaEl.setRangeText('', selectionStart, selectionEnd, 'start');\n      e.preventDefault();\n    }\n    if (keyObj.langKey[this.currentLang].key === 'Backspace') {\n      let { selectionStart } = this.textareaEl;\n      const { selectionEnd } = this.textareaEl;\n      if (selectionStart === selectionEnd && selectionStart > 0) { selectionStart -= 1; }\n      this.textareaEl.setRangeText('', selectionStart, selectionEnd, 'start');\n      e.preventDefault();\n    }\n    if (keyObj.langKey[this.currentLang].key === 'ArrowLeft') {\n      if (this.textareaEl.selectionStart > 0) {\n        this.textareaEl.selectionStart -= 1;\n        this.textareaEl.selectionEnd = this.textareaEl.selectionStart;\n      }\n      e.preventDefault();\n    }\n    if (keyObj.langKey[this.currentLang].key === 'ArrowRight') {\n      this.textareaEl.selectionStart += 1;\n      this.textareaEl.selectionEnd = this.textareaEl.selectionStart;\n      e.preventDefault();\n    }\n    if (keyObj.langKey[this.currentLang].key === 'ArrowDown') {\n      const rows = this.textareaEl.value.split('\\n');\n      const { selectionStart } = this.textareaEl;\n      let cursorRow = 0;\n      let cursorRowPosition = selectionStart;\n      let nextPosition = 0;\n\n      for (let i = 0; i < rows.length; i += 1) {\n        nextPosition += rows[i].length;\n        if (rows[i].length >= cursorRowPosition) {\n          cursorRow = i;\n          break;\n        }\n        cursorRowPosition -= rows[i].length + 1;\n      }\n      if (rows[cursorRow + 1] === undefined) {\n        nextPosition = this.textareaEl.value.length;\n      } else if (cursorRowPosition <= rows[cursorRow + 1].length) {\n        nextPosition += cursorRowPosition + cursorRow + 1;\n      } else {\n        nextPosition += rows[cursorRow + 1].length + cursorRow + 1;\n      }\n\n      this.textareaEl.selectionStart = nextPosition;\n      this.textareaEl.selectionEnd = nextPosition;\n      e.preventDefault();\n    }\n    if (keyObj.langKey[this.currentLang].key === 'ArrowUp') {\n      const rows = this.textareaEl.value.split('\\n');\n      const { selectionStart } = this.textareaEl;\n      let cursorRow = 0;\n      let cursorRowPosition = selectionStart;\n      let nextPosition = 0;\n\n      for (let i = 0; i < rows.length; i += 1) {\n        if (rows[i].length >= cursorRowPosition) {\n          cursorRow = i;\n          break;\n        }\n        nextPosition += rows[i].length;\n        cursorRowPosition -= rows[i].length + 1;\n      }\n      if (rows[cursorRow - 1] === undefined) {\n        nextPosition = 0;\n      } else if (cursorRowPosition <= rows[cursorRow - 1].length) {\n        nextPosition += -rows[cursorRow - 1].length + cursorRowPosition + cursorRow - 1;\n      } else {\n        nextPosition += cursorRow - 1;\n      }\n\n      this.textareaEl.selectionStart = nextPosition;\n      this.textareaEl.selectionEnd = nextPosition;\n      e.preventDefault();\n    }\n  }\n\n  unpressKey(keyObj, e) {\n    if (keyObj.keyEl.classList.contains('key--active') && !keyObj.animation) {\n      keyObj.keyEl.classList.remove('key--active');\n      // keyObj.animationEnd = false;\n    } else if (keyObj.keyEl.classList.contains('key--active') && keyObj.animation) {\n      const transitionendHandler = (event) => {\n        if (event.pseudoElement === '::before') {\n          if (keyObj.keyEl.classList.contains('key--active')) {\n            keyObj.keyEl.classList.remove('key--active');\n            keyObj.animation = false;\n          }\n          keyObj.keyEl.removeEventListener('transitionend', transitionendHandler);\n        }\n      };\n      keyObj.keyEl.addEventListener('transitionend', transitionendHandler);\n    }\n\n    if (keyObj.langKey[this.currentLang].key === 'Shift') {\n      this.shift = false;\n    }\n    if (keyObj.langKey[this.currentLang].key === 'Shift') {\n      this.switchUpperCase(false);\n    }\n  }\n\n  printText(text) {\n    const { selectionStart, selectionEnd } = this.textareaEl;\n    this.textareaEl.setRangeText(text, selectionStart, selectionEnd, 'end');\n  }\n\n  switchUpperCase(upper) {\n    if (upper === 'CapsLock') {\n      this.capsLock = !this.capsLock;\n    }\n    if (upper === 'Shift') {\n      this.shift = true;\n    }\n    Object.values(this.keys).forEach((key) => {\n      if (key.langKey[this.currentLang].shiftKey) {\n        if (this.shift) {\n          key.setText(key.langKey[this.currentLang].shiftKey);\n        } else if (this.capsLock) {\n          key.setText(key.langKey[this.currentLang].key.toUpperCase());\n        } else {\n          key.setText(key.langKey[this.currentLang].key);\n        }\n      }\n    });\n  }\n\n  changeLanguage() {\n    if (this.currentLang === 'en') {\n      this.setLangSettings('ru');\n    } else {\n      this.setLangSettings('en');\n    }\n    Object.values(this.keys).forEach((key) => {\n      key.changeLanguage(this.currentLang);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./classes/Keyboard.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/styles/style.css */ \"./assets/styles/style.css\");\n/* harmony import */ var _lang_key_en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang/key-en */ \"./lang/key-en.js\");\n/* harmony import */ var _lang_key_ru__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lang/key-ru */ \"./lang/key-ru.js\");\n/* harmony import */ var _classes_Keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/Keyboard */ \"./classes/Keyboard.js\");\n\n\n\n\n\n\nconst langs = { en: _lang_key_en__WEBPACK_IMPORTED_MODULE_1__[\"default\"], ru: _lang_key_ru__WEBPACK_IMPORTED_MODULE_2__[\"default\"] };\nconst layout = [\n  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],\n  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],\n  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],\n  ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],\n  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],\n];\n\nconst keyboard = new _classes_Keyboard__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({ layout, langs });\nkeyboard.init();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lang/key-en.js":
/*!************************!*\
  !*** ./lang/key-en.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  Backquote: {\n    key: '`',\n    shiftKey: '~',\n  },\n  Digit1: {\n    key: '1',\n    shiftKey: '!',\n  },\n  Digit2: {\n    key: '2',\n    shiftKey: '@',\n  },\n  Digit3: {\n    key: '3',\n    shiftKey: '#',\n  },\n  Digit4: {\n    key: '4',\n    shiftKey: '$',\n  },\n  Digit5: {\n    key: '5',\n    shiftKey: '%',\n  },\n  Digit6: {\n    key: '6',\n    shiftKey: '^',\n  },\n  Digit7: {\n    key: '7',\n    shiftKey: '&',\n  },\n  Digit8: {\n    key: '8',\n    shiftKey: '*',\n  },\n  Digit9: {\n    key: '9',\n    shiftKey: '(',\n  },\n  Digit0: {\n    key: '0',\n    shiftKey: ')',\n  },\n  Minus: {\n    key: '-',\n    shiftKey: '_',\n  },\n  Equal: {\n    key: '=',\n    shiftKey: '+',\n  },\n  Backspace: {\n    key: 'Backspace',\n    shiftKey: null,\n  },\n  Delete: {\n    key: 'Delete',\n    shiftKey: null,\n  },\n  Tab: {\n    key: 'Tab',\n    shiftKey: null,\n    symbol: '\\t',\n  },\n  KeyQ: {\n    key: 'q',\n    shiftKey: 'Q',\n  },\n  KeyW: {\n    key: 'w',\n    shiftKey: 'W',\n  },\n  KeyE: {\n    key: 'e',\n    shiftKey: 'E',\n  },\n  KeyR: {\n    key: 'r',\n    shiftKey: 'R',\n  },\n  KeyT: {\n    key: 't',\n    shiftKey: 'T',\n  },\n  KeyY: {\n    key: 'y',\n    shiftKey: 'Y',\n  },\n  KeyU: {\n    key: 'u',\n    shiftKey: 'U',\n  },\n  KeyI: {\n    key: 'i',\n    shiftKey: 'I',\n  },\n  KeyO: {\n    key: 'o',\n    shiftKey: 'O',\n  },\n  KeyP: {\n    key: 'p',\n    shiftKey: 'P',\n  },\n  BracketLeft: {\n    key: '[',\n    shiftKey: '{',\n  },\n  BracketRight: {\n    key: ']',\n    shiftKey: '}',\n  },\n  Enter: {\n    key: 'Enter',\n    shiftKey: null,\n    symbol: '\\n',\n  },\n  CapsLock: {\n    key: 'CapsLock',\n    shiftKey: null,\n  },\n  KeyA: {\n    key: 'a',\n    shiftKey: 'A',\n  },\n  KeyS: {\n    key: 's',\n    shiftKey: 'S',\n  },\n  KeyD: {\n    key: 'd',\n    shiftKey: 'D',\n  },\n  KeyF: {\n    key: 'f',\n    shiftKey: 'F',\n  },\n  KeyG: {\n    key: 'g',\n    shiftKey: 'G',\n  },\n  KeyH: {\n    key: 'h',\n    shiftKey: 'H',\n  },\n  KeyJ: {\n    key: 'j',\n    shiftKey: 'J',\n  },\n  KeyK: {\n    key: 'k',\n    shiftKey: 'K',\n  },\n  KeyL: {\n    key: 'l',\n    shiftKey: 'L',\n  },\n  Semicolon: {\n    key: ';',\n    shiftKey: ':',\n  },\n  Quote: {\n    key: \"'\",\n    shiftKey: '\"',\n  },\n  Backslash: {\n    key: '\\\\',\n    shiftKey: '|',\n  },\n  ShiftLeft: {\n    key: 'Shift',\n    shiftKey: null,\n  },\n  IntlBackslash: {\n    key: '<',\n    shiftKey: '>',\n  },\n  KeyZ: {\n    key: 'z',\n    shiftKey: 'Z',\n  },\n  KeyX: {\n    key: 'x',\n    shiftKey: 'X',\n  },\n  KeyC: {\n    key: 'c',\n    shiftKey: 'C',\n  },\n  KeyV: {\n    key: 'v',\n    shiftKey: 'V',\n  },\n  KeyB: {\n    key: 'b',\n    shiftKey: 'B',\n  },\n  KeyN: {\n    key: 'n',\n    shiftKey: 'N',\n  },\n  KeyM: {\n    key: 'm',\n    shiftKey: 'M',\n  },\n  Comma: {\n    key: ',',\n    shiftKey: '<',\n  },\n  Period: {\n    key: '.',\n    shiftKey: '>',\n  },\n  Slash: {\n    key: '/',\n    shiftKey: '?',\n  },\n  ShiftRight: {\n    key: 'Shift',\n    shiftKey: null,\n  },\n  ControlLeft: {\n    key: 'Ctrl',\n    shiftKey: null,\n  },\n  AltLeft: {\n    key: 'Alt',\n    shiftKey: null,\n  },\n  Space: {\n    key: ' ',\n    shiftKey: null,\n  },\n  AltRight: {\n    key: 'Alt',\n    shiftKey: null,\n  },\n  ControlRight: {\n    key: 'Ctrl',\n    shiftKey: null,\n  },\n  ArrowLeft: {\n    key: 'ArrowLeft',\n    shiftKey: null,\n    icon: '←',\n  },\n  ArrowUp: {\n    key: 'ArrowUp',\n    shiftKey: null,\n    icon: '↑',\n  },\n  ArrowDown: {\n    key: 'ArrowDown',\n    shiftKey: null,\n    icon: '↓',\n  },\n  ArrowRight: {\n    key: 'ArrowRight',\n    shiftKey: null,\n    icon: '→',\n  },\n  MetaLeft: {\n    key: 'Meta',\n    shiftKey: null,\n  },\n  MetaRight: {\n    key: 'Meta',\n    shiftKey: null,\n  },\n});\n\n\n//# sourceURL=webpack:///./lang/key-en.js?");

/***/ }),

/***/ "./lang/key-ru.js":
/*!************************!*\
  !*** ./lang/key-ru.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  CapsLock: {\n    key: 'CapsLock',\n    shiftKey: null,\n  },\n  Backquote: {\n    key: 'ё',\n    shiftKey: 'Ё',\n  },\n  Digit1: {\n    key: '1',\n    shiftKey: '!',\n  },\n  Digit2: {\n    key: '2',\n    shiftKey: '\"',\n  },\n  Digit3: {\n    key: '3',\n    shiftKey: '№',\n  },\n  Digit4: {\n    key: '4',\n    shiftKey: ';',\n  },\n  Digit5: {\n    key: '5',\n    shiftKey: '%',\n  },\n  Digit6: {\n    key: '6',\n    shiftKey: ':',\n  },\n  Digit7: {\n    key: '7',\n    shiftKey: '?',\n  },\n  Digit8: {\n    key: '8',\n    shiftKey: '*',\n  },\n  Digit9: {\n    key: '9',\n    shiftKey: '(',\n  },\n  Digit0: {\n    key: '0',\n    shiftKey: ')',\n  },\n  Minus: {\n    key: '-',\n    shiftKey: '_',\n  },\n  Equal: {\n    key: '=',\n    shiftKey: '+',\n  },\n  Backspace: {\n    key: 'Backspace',\n    shiftKey: null,\n  },\n  Delete: {\n    key: 'Delete',\n    shiftKey: null,\n  },\n  Tab: {\n    key: 'Tab',\n    shiftKey: null,\n    symbol: '\\t',\n  },\n  KeyQ: {\n    key: 'й',\n    shiftKey: 'Й',\n  },\n  KeyW: {\n    key: 'ц',\n    shiftKey: 'Ц',\n  },\n  KeyE: {\n    key: 'у',\n    shiftKey: 'У',\n  },\n  KeyR: {\n    key: 'к',\n    shiftKey: 'К',\n  },\n  KeyT: {\n    key: 'е',\n    shiftKey: 'Е',\n  },\n  KeyY: {\n    key: 'н',\n    shiftKey: 'Н',\n  },\n  KeyU: {\n    key: 'г',\n    shiftKey: 'Г',\n  },\n  KeyI: {\n    key: 'ш',\n    shiftKey: 'Ш',\n  },\n  KeyO: {\n    key: 'щ',\n    shiftKey: 'Щ',\n  },\n  KeyP: {\n    key: 'з',\n    shiftKey: 'З',\n  },\n  BracketLeft: {\n    key: 'х',\n    shiftKey: 'Х',\n  },\n  BracketRight: {\n    key: 'ъ',\n    shiftKey: 'Ъ',\n  },\n  Enter: {\n    key: 'Enter',\n    shiftKey: null,\n    symbol: '\\n',\n  },\n  KeyA: {\n    key: 'ф',\n    shiftKey: 'Ф',\n  },\n  KeyS: {\n    key: 'ы',\n    shiftKey: 'Ы',\n  },\n  KeyD: {\n    key: 'в',\n    shiftKey: 'В',\n  },\n  KeyF: {\n    key: 'а',\n    shiftKey: 'А',\n  },\n  KeyG: {\n    key: 'п',\n    shiftKey: 'П',\n  },\n  KeyH: {\n    key: 'р',\n    shiftKey: 'Р',\n  },\n  KeyJ: {\n    key: 'о',\n    shiftKey: 'О',\n  },\n  KeyK: {\n    key: 'л',\n    shiftKey: 'Л',\n  },\n  KeyL: {\n    key: 'д',\n    shiftKey: 'Д',\n  },\n  Semicolon: {\n    key: 'ж',\n    shiftKey: 'Ж',\n  },\n  Quote: {\n    key: 'э',\n    shiftKey: 'Э',\n  },\n  Backslash: {\n    key: '\\\\',\n    shiftKey: '/',\n  },\n  ShiftLeft: {\n    key: 'Shift',\n    shiftKey: null,\n  },\n  IntlBackslash: {\n    key: '/',\n    shiftKey: '|',\n  },\n  KeyZ: {\n    key: 'я',\n    shiftKey: 'Я',\n  },\n  KeyX: {\n    key: 'ч',\n    shiftKey: 'Ч',\n  },\n  KeyC: {\n    key: 'с',\n    shiftKey: 'С',\n  },\n  KeyV: {\n    key: 'м',\n    shiftKey: 'М',\n  },\n  KeyB: {\n    key: 'и',\n    shiftKey: 'И',\n  },\n  KeyN: {\n    key: 'т',\n    shiftKey: 'Т',\n  },\n  KeyM: {\n    key: 'ь',\n    shiftKey: 'Ь',\n  },\n  Comma: {\n    key: 'б',\n    shiftKey: 'Б',\n  },\n  Period: {\n    key: 'ю',\n    shiftKey: 'Ю',\n  },\n  Slash: {\n    key: '.',\n    shiftKey: ',',\n  },\n  ShiftRight: {\n    key: 'Shift',\n    shiftKey: null,\n  },\n  ControlLeft: {\n    key: 'Ctrl',\n    shiftKey: null,\n  },\n  AltLeft: {\n    key: 'Alt',\n    shiftKey: null,\n  },\n  Space: {\n    key: ' ',\n    shiftKey: null,\n  },\n  AltRight: {\n    key: 'Alt',\n    shiftKey: null,\n  },\n  ControlRight: {\n    key: 'Ctrl',\n    shiftKey: null,\n  },\n  ArrowLeft: {\n    key: 'ArrowLeft',\n    shiftKey: null,\n    icon: '←',\n  },\n  ArrowUp: {\n    key: 'ArrowUp',\n    shiftKey: null,\n    icon: '↑',\n  },\n  ArrowDown: {\n    key: 'ArrowDown',\n    shiftKey: null,\n    icon: '↓',\n  },\n  ArrowRight: {\n    key: 'ArrowRight',\n    shiftKey: null,\n    icon: '→',\n  },\n  MetaLeft: {\n    key: 'Meta',\n    shiftKey: null,\n  },\n  MetaRight: {\n    key: 'Meta',\n    shiftKey: null,\n  },\n});\n\n\n//# sourceURL=webpack:///./lang/key-ru.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;