- node: v18.13.0
- npm: 8.19.3

# Запустить сборку

- скачайте необходимые зависимости: `npm i`
- чтобы начать работу, введите команду: `npm run dev` (режим разработки)
- чтобы собрать проект, введите команду `npm run build` (режим сборки)

## Команды

- `npm run dev` - запуск сервера для разработки проекта
- `npm run build` - собрать проект с оптимизацией без запуска сервера
- `npm run build:views` - скомпилировать Pug-файлы
- `npm run build:styles` - скомпилировать SCSS-файлы
- `npm run build:scripts` - собрать JS-файлы
- `npm run build:webp` - конвертировать изображения в формат `.webp`
- `npm run build:sprites`- собрать спрайты
- `npm run build:fonts` - собрать шрифты
- `npm run build:gzip` - собрать конфигурацию Apache
- `npm run build:images` - собрать изображения

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
