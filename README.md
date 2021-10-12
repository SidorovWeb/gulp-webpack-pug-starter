- node: v14.17.6
- yarn: 1.22.10

# Запустить сборку

- скачайте необходимые зависимости: `yarn`
- чтобы начать работу, введите команду: `yarn run dev` (режим разработки)
- чтобы собрать проект, введите команду `yarn run build` (режим сборки)

## Команды

- `yarn run dev` - запуск сервера для разработки проекта
- `yarn run build` - собрать проект с оптимизацией без запуска сервера
- `yarn run build:views` - скомпилировать Pug-файлы
- `yarn run build:styles` - скомпилировать SCSS-файлы
- `yarn run build:scripts` - собрать JS-файлы
- `yarn run build:images` - собрать изображения
- `yarn run build:webp` - сконвертировать изображения в формат `.webp`
- `yarn run build:sprites`- собрать спрайты
- `yarn run build:fonts` - собрать шрифты
- `yarn run build:gzip` - собрать конфигурацию Apache

## Файловая структура

```
gulp-pug-starter
├── dist
├── gulp-tasks
├── src
│   ├── blocks
│   │   │── components
│   │   └── modules
│   ├── fonts
│   ├── img
│   │   │── favicons
│   │   ├── sprites
│   │   │   │── sprite-mono
│   │   │   └── sprite-multi
│   │   └── svg
│   ├── js
│   ├── mail
│   ├── styles
│   ├── views
│   └── .htaccess
├── gulpfile.babel.js
├── webpack.config.js
├── package.json
├── .babelrc.js
├── .bemrc.js
├── .eslintrc.json
├── .stylelintrc
├── .stylelintignore
└── .gitignore
```

## Создание БЭМ-блока - БЭМ-компонента

- установите `bem-tools-core` глобально: ```yarn global add bem-tools-core`

* `bem create my-block` - для создания папки БЭМ-блока, где `my-block` - имя БЭМ-блока
* `bem create my-component -l src/blocks/components` для создания компонента
* `bem create my-component -l src/blocks/components && bem create my-block` - создать всё вместе

### Изображения

- изображения автоматически конвертируются в формат `.webp`.

### SVG

**sprite-mono**

- Одноцветные иконки.

**sprite-multi**

- Цветные иконки.

**svg**

- Сложные изображения.

### Сторонние библиотеки

- для подключения стилевых файлов библиотек импортируйте их в файл `src/styles/vendor/_libs.scss`

:warning: Если в вашем проекте используется несколько библиотек, которые необходимо подключать на нескольких страницах, во избежании ошибок нужно:

- по пути `src/js/import` создать папку `pages`
- в папке `pages` создать js-файл для страницы, например, `pageA.js`, и импортировать туда библиотеку, которая будет использоваться только на этой странице
  - аналогично проделать шаг для дополнительных страниц
- в файле `webpack.config.js` в точку входа добавить js-файлы страниц, пример:

```javascript
entry: {
    main: "./src/js/index.js",
    pageA: "./src/js/import/pages/pageA.js",
    pageB: "./src/js/import/pages/pageB.js"
}
```
