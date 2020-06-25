# Full stack open - Personal notes

## Deep Dive Into Modern Web Development

## About 

This repo contains the code that I have produced so far as part of the University of Helsinki's [Full stack course](https://fullstackopen.com/en).

The course serves as an introduction to modern web application development with JavaScript. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js. It also covers GraphQL (a modern alternative to REST APIs), testing, configuration and environment management, and the use of MongoDB for storing the application’s data.

My current certificate can be found [here](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/994a1f64471fc5fa33204f9fb4b777ef). 

And the live app [here](https://notes-app-fso.herokuapp.com/). 

Links to my submissions for each chapter's exercises will be added as I progress.

## Contents:

<ol start="0">
  <li>Fundamentals of Web apps</li>
  <li>Introduction to React</li>
  <li>Communicating with server</li>
  <li>Programming a server with NodeJS and Express</li>
  <li>Testing Express servers, user administration</li>
  <li>Testing React app</li>
  <li>State management with Redux</li>
  <li>React router, custom hooks, styling app with CSS and webpack</li>
  <li>GraphQL</li>
  <li>Typescript</li>
</ol>

## 3 Programming a server with Node.js and Express
### 3a Node.js and Express
### 3b Deploying app to internet
  - Add cors middleware:
    npm install cors --save, const cors = require('cors'), const cors = require('cors')
  - Deploying backend to Heroku
    - Create Procfile at root with:  web: npm start --prefix backend_folder
    - Create package.json at root with a script:  "postinstall": "npm install --prefix backend_folder"
    - Make sure PORT is set to process.env.PORT
    - heroku login, create, set remote (heroku git:remote -a heroku_set_app_name)
    - At root of folder, run: git subtree push --prefix path/to/backend_subdirectory heroku master
  - Linking frontend and backend, and deploying
    - In frontend, set api url to relative
    - npm run build in frontend, and make sure not .gitignore'd
    - Copy build into backend directory
    - add express static middleware and use it: app.use(express.static('build')).
        Frontend can then be used on backend port address
    - Then deploy to heroku using same as above method.
    - Set npm scripts for convenience


### 3c Saving data to MongoDB (persisting data in a DB)
- Debugging Node applications: 
  - VS Code debugger
  - Chrome debugger (run using $ node --inspect index.js)
- MongoDB (Atlas)
  - Mongoose is and Object Document Mapper (ODM). It offers a high level API for using a database
    Install as a dependency, and require it in your mongo.js file.
  - In our file, establish the connection to the database, define the schema and matching model, 
- Posting objects to the database
  - create the new object using modelName.save(), save it, and close the connection.
  - Make sure the mongoose.connection.close() is in the callback function
- Fetching objects from the database
  - using the .find({ conditions }) method of the model, where 'conditions' are the optional 
  conditions of the search
- Database configuration into its own module
  - Integrate the above from the mongoose.js separate file model into the index.js file by requiring the mongoose file in index.js
  - Using env variables: add .env to .gitignore, create .env file, 
    install and require('dotenv').config()
  - Modify the toJSON method of the schema, if required
- Using database in route handlers
  - Posting to db - use newItemName.save()
  - Fetching individual items - use ModelName.findById(id)
- Verifying frontend and backend integration
- Error handling
- Moving error handling into middleware
- The order of middleware loading
- Other operations

### 3d Validation and ESLint
- Promise chaining
- Deploying the database backend to production
- Lint

## 4 Testing Express servers, user administration
### 4a Structure of backend application, introduction to testing
- Project structure
  - See website for example of folder structure that adheres to best practice
  - printing to console should be in its own module eg utils/logger.js
  - index.js is used for starting the application ie creating a server for the app(.js), which gets 'listened' to
  - env variables in a separate utils/config.js file
  - route handlers (or the eventh handlers for routes) are commonly referred to and stored in controller directories
    - the router is a middleware in node.js
  - middleware gets moved to utils/middleware.js
  - app.js takes the different middleware into use, and is responsible for establishing connection to the db
  - files in the models directory define the Mongoose schema
  
- Testing node applications
  - Install jest as a devDependency, and add a package.json script if desired
  - Jest may require specifying the execution env is Node. Add "jest": { "testEnvironment": "node" } to your package.json
    - Or you can use a jest.config.js file https://mongoosejs.com/docs/jest.html
  - Tests should be in their own "test" directory
  - Add "jest": true to the env property in .eslintrc.js config file if using it, to allow for globals like 'test' and 'expect'
  - When debugging tests: https://jestjs.io/docs/en/troubleshooting
  - When comparing objects in tests, better to use toEqual rather than toBe because the latter tries to verify that the two values are the same value, and not just that they contain the same properties.

### 4b Testing the backend
  - Test environment
    - mongo-mock library can be used to mock databases when testing (although not used here)
    - integration testing: testing where multiple components of the system are tested as a group
    - change the env using eg. "NODE_ENV=production" in the terminal, or package.json scripts
    - adding the --verbose flag to jest displays individual test results within the test suite heiarchy
    - adding the --runInBand flag to jest prevents Jest from running tests in parallel.
    - in the config file, have an if conditional for setting the appropriate db when the NODE_ENV is 'test'
    - install and add cross-env package so the specification of the env mode also works in Windows
    - Now we can modify the way our app runs in different modes eg use a separate db when testing
    - Rather than on cloud, better to keep test db installed and running locally (although MongoDB Atlas is used here)
  - supertest
    - supertest package can help us write our tests for testing the API (npm i --save-dev supertest), by wrapping our express app in a superagent object
    - you may need to add a jest.config.js file as above, if eg you get an error message "Jest did not exit one second after the test run has completed"
  - Initializing the db before tests
    - clear out and initialize the db at the start of each test, so the db is in the same state before every test run
      - in Jest, you can use beforeEach
  - Running tests one by one
    - you can add only on to the test eg "test.only"
    - add -- tests/file_name.test.js after 'npm test' in the terminal to only run one test file
    - 'npm test -- -t 'a specific note is within the returned notes' to run a specifically named test
    - npm test -- -t 'notes' runs all tests containing the word 'notes'
    - NB: when running a single test, the mongoose connection may stay open if no tests using the connection are run, as Jest may not run the afterAll code which contains the closing execution.
  - Async/await
    - chaining proimises is preferred over callback nesting
    - async and await allows us to write asynchronous code in a way that "looks synchronous". It helps our code be understandable and syntactically cleaner than even chaining promises
    - In order to use the await operator with asynchronous operations, they have to return a promise
    - await is only possible inside of an async function
  - async/await in the backend
  - More tests and refactoring the backend
    - We can create test helper files for refactoring
  - Error handling and async/await
    - With chaining we use .catch, but with async/await, we can use the try/catch mechanism
  - Eliminating the try-catch
    - The express-async-errors library can be used to refactor the code by eliminating the need for the catch part
      - npm i express-async-errors and require it in the app.js file
  - Optimizing the beforeEach function
    - Can be done by looping with a for...of loop if we need operations to be run in a particular order
    - Alternatively, we can ensure all promises have resolved using Promise.all if order is unimportant (as they run in parallel)
  - Refactoring tests
    - Separate tests into describe blocks if necessary
  
### 4b: User administration
  - Traditionally, Mongo (a document db) does not support join queries that are available in relational databases, used for aggregating data from multiple tables.
  - In document db, unlike relational db, there are many ways of modelling the same situation. Therefore more decision making at the start of a project may be required with schema-less dbs like Mongo.

- Reference across collections
  - In document db, the foreign key/reference can be stored in documents of both collections

- Mongoose schema for users
  - As above, we can can include the foreign key in both the 'note' and 'user' model schemas.

- Creating users
  - a passwordHash is the output of a one-way has function
  - we can encrypt the passwords by installing bcrypt
  - We should store the hash of the password generated by bcrypt in the db, rather than the actual password when creating/saving our user
  - Use mongoose-unique-validator to ensure uniqueness where needed (eg usernames)
  
- Creating a new note
  - The code for notes has to be updated so they are assigned to the appropriate user
  - When posting a note, the user too has to be updated to reflect it now has an additional note assigned to it

- Populate
  - Document dbs like MongoDB do not properly support join queries between collections, but Mongoose can accomplish joins by doing multiple queries. However, using this method means the state of collections when making a join query may change.
  - The Mongoose join is done with the populate method. It allows us to populate the notes identified by their ids with all their values when we look at all/a specific user.
  - We can also populate more info about the user when looking at a note.
  - Note: the db does not actually know that the ids stored in the user field of notes reference documents in the user collection. The functionality of populate is based on the 'types' we defined in the Mongoose schema with the ref option.

### 4b: Token authentication
  - Tokens can be used for logging in, via installing jsonwebtoken

- Limiting creating new notes to logged in users:
  - Creating notes is only possible if the post request has a valid token attached, and saved to the notes lit of the user id'ed by that token.
  - The Authorization header can be used to send the token from browser to server
  - Identifying the schema tells the server how the attached credentials should be interpreted (the Bearer schema is suitable for our needs)

- Error handling
  - we can add an error hanlder for a JSON web token error

