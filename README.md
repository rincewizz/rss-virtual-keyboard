# rss-virtual-keyboard
## Учебный проект rss-school

1. Task:
   https://github.com/rolling-scopes-school/tasks/blob/04528c80f051b2d5bc11930e91fff78ed579548a/tasks/virtual-keyboard/virtual-keyboard-en.md
2. App screenshot:
   ![image](https://user-images.githubusercontent.com/95530503/167307542-19173a4e-43e3-40a2-b6b1-6a7126827b57.png)
3. Deploy:  
   https://rincewizz.github.io/rss-virtual-keyboard/
4. Done 08.05.22 (deadline 10.05.22)
5. Score: 110 / 110
- [x] Minimal scope
    - [x] the generation of DOM elements is implemented. body in the index.html is empty (can contain only script tag):  (+20)
    - [x] pressing a key on a physical keyboard highlights the key on the virtual keyboard (you should check keystrokes of numbers, letters, punctuation marks, backspace, del (if it's present), enter, shift, alt, ctrl, tab, caps lock, space, arrow keys(+20)
- [x] Basic scope
    - [x] switching keyboard layouts between English and another language is implemented. Selected language should be saved and used on page reload. A keyboard shortcut for switching a language should be specified on the page (+15)
    - [x] mouse clicks on buttons of the virtual keyboard or pressing buttons on a physical keyboard inputs characters to the input field (text area): (+15)
- [x] Extra scope
    - [x] animation of pressing a key is implemented (+15)
- [x] Technical requirements
    - [x] usage of ES6+ features (classes, property destructuring, etc) (+15)
    - [x] usage of ESLint (+10)
    - [x] requirements to the repository, commits and pull request are met (+10)
- [ ] Penalties
    - [ ] there're errors related to the executable code (errors like favicon.ico: Failed to load resource: the server responded with a status of 404 are not taken into account) or there're eslint-config-airbnb-base warnings 

### Инструкция по сборке
1. Склонировать репозиторий: `git clone git@github.com:rincewizz/rss-virtual-keyboard.git`
2. Перейти в папку проекта: `cd rss-virtual-keyboard`
3. Перейти на ветку разработки: `git checkout dev` 
4. Установить зависимости: `npm i` (**Внимание**: Разрботка велась на nodejs 16)
5. Сделать сборку: production `npm run build` или development `npm run dev`
