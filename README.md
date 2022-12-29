
[![Logo](https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg)](https://vk.com/services)


# VKMA Boilerplate - быстрый старт для фронтенда

## Что используется

 - VKUI v4.19
 - VK Icons
 - VK Bridge
 - VK deploy
 - Axios
 - Redux
 - @happysanta/router

## Как запустить

### Склонировать репозиторий
### Установить зависимости
`npm i`
### Определиться, нужен ли Epic
В `index.js` выберите, какой компонент должен рендериться: App или AppWithEpic.
### Запустить проект
`npm start` — команда запустит приложение по адресу `localhost:10888`.

## Как задеплоить
Указать идентификатор приложения в файле `vk-hosting-config.json`
`npm run deploy` — запустить и следовать подсказкам в терминале
