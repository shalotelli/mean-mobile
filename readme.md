MEAN Boilerplate
================

My attempt at a basic MEAN Boilerplate. This project is meant to be a starting point for simple projects. I created it to better understand what goes on under the hood in bigger, more complete frameworkds such as MEAN.io and SailsJS.

#Features

#Requirements
1. NodeJS
2. NPM
3. MongoDB
4. Gulp
5. Bower

#Installation
```bash
# Clone the boilerplate
$ git clone https://github.com/shalotelli/mean.git <project-name>

# Install dependencies
$ cd <project-name> && npm install && bower install

# Update remote repository URL
$ git remote origin set-url <project-remote-url>
```

#Usage

##Gulp Tasks
| Task | Description |
|------|-------------|
| dev | Runs JSHint, Concats app & dependency JS files, Compiles SASS files, converts view templates to JS |
| serve | All dev tasks + run nodemon server on port 3000 (default) |
| build | All dev tasks + CSS min & JS Uglify |

##Crud (api/services/Crud.js)
- Automatically add find, create, update & delete methods to a controller
- Easily makes a model accessible
- Usage: 
```javascript
// api/controllers/ExampleController.js

var Crud = require('../services/Crud.js');

// Add Crud methods to access Example model
module.exports = new Crud(Example);
```

## Restify (api/services/Restify.js)
- Automatically create GET, POST, PUT & DELETE methods
- Best used with Crud controllers
- Usage:
```javascript
// config/routes.js
var restify = require('../api/services/Restify.js'),
    ExampleController = require('../api/controllers/ExampleController.js');
    
restify('api/example', ExampleController);
```

#Folder Structure
| - app
  | - controllers
  | - models
  | - services
    | - Crud.js
    | - Restify.js
| - assets
  | - app
    | - controllers
    | - models
    | - services
  | - scss
    | - app.scss
  | - views
  | - index.html
| - config
  | - config.js
  | - init.js
  | - routes.js
| - .bowerrc
| - .gitignore
| - bower.json
| - gulpfile.js
| - package.json
| - readme.md
| - server.js

#Ideas
- [ ] Add Plato code coverage
- [ ] Add Jasmine tests
- [ ] Add AngularJS constants
- [ ] CLI
- [ ] Add ecosystem.json file for PM2
- [ ] Add Bootstrap
- [ ] Add password.js auth framework

#Contributors
- [@Shalotelli](https://twitter.com/shalotelli)
