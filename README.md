- node: v14.17.6
- yarn: 1.22.17

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
- `yarn run build:webp` - конвертировать изображения в формат `.webp`
- `yarn run build:sprites`- собрать спрайты
- `yarn run build:fonts` - собрать шрифты
- `yarn run build:gzip` - собрать конфигурацию Apache
- `yarn run build:images` - собрать изображения

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
├── gulpfile.js
├── webpack.config.js
├── package.json
├── .babelrc.cjs
├── .eslintrc.json
├── .stylelintrc
├── .stylelintignore
└── .gitignore
```
