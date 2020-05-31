# Creating backend

$ npm init -y
$ npm install --save-dev nodemon
$ npm install express
$ touch index.js
In index.js, require express, define JSON object (resources) with data, app.get, define port and listen to it

Install cors, a Node middleware, to allow requests from other origins when linking the front and backend
$ npm install cors --save 
Then include it in your index.js

Add procfile to tell Heroku how to start application with content: web: node index.js

$ npm install eslint --save-dev
$ node_modules/.bin/eslint --init



