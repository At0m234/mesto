# __Yandex.Practicum. Web Development training course. Project work No. 4-9: Mesto Russia__
## __Functionality__
"Mesto Russia" - adaptive single-page web application based on a layout from Figma.

The application is created using HTML, CSS (flexbox, grid), Native JavaScript, Webpack, REST API. The project is connected to the Yandex.Practicum server.

The application is optimized for screen resolutions from 320px to infinity. The Desktop First approach was used in the layout.

JavaScript validation is implemented: when entering incorrect data in one of the fields, the form submission button is blocked, a stylized error message is displayed under the field with incorrectly entered data.

All JavaScript code is divided into classes, using weak binding between classes. The constants are placed in a separate module.

Webpack, Babel is installed, HTML, CSS, images and fonts processing is configured.

The application allows the user to:
- add and delete own cards with photos and names;
- put and delete likes;
- edit information about yourself (name, profession);
- change own avatar.

## __[GitHub Pages](https://At0m234.github.io/mesto/)__

## __Available Scripts__
### `npm install` 
installing all dependencies from package.json;
### `npm run build`
building a project in the "dist" folder;
### `npm run dev`
launch developer mode with a hot reload on http://localhost:8080/ in the browser;
### `npm run deploy`
deploy the "dist" folder to the gh-pages branch of the remote repository.

## __Stack:__

### `HTML`
### `CSS`
### `Native JavaScript`
### `Webpack`
### `REST API`