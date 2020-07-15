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
  - The token has been digitally signed using a string from the environment variable SECRET as the secret. The digital signature ensures that only parties who know the secret can generate a valid token. The value for the environment variable must be set in the .env file.

- Error handling
  - we can add an error hanlder for a JSON web token error

## 5 Testing React apps

### 5a: Login in frontend
  - Fixing the frontend so it allows for tokens
  - We can create a form and use state for login, combined with a post request with the credentials
  - A React trick for rendering things conditionally: {user === null && loginForm()}


- Creating new notes
  - the token returned with a successful login is saved to the application's state - the user's token field
  - Add the token of the logged-in user to the Authorization header of the HTTP request. 

- Saving the token to the brower's local storage
  - So when we rerender a page, the login details are still available.
  - Do this using: window.localStorage.setItem('key', 'value'). Related functions are getItem and removeItem
  - Values saved to the storage are DOMstrings, so can't save a JS object as is. Parse it to JSON first, using JSON.stringify
  - For the other direction, parse it back to JS using JSON.parse
  - You can inspect local storage using the browser console or the Application tab of the browser
  - Use an effect hook to check if details of a logged in user can already be found in local storage, and save it to our app's state
  - As a temporary way to logout, we can use the terminal to simply clear the local storage:
      window.localStorage.remove('key_of_variable') for individual key-value pairs, or window.localStorage.clear() for everything
  - remove the git configuration of the cloned application: >rm -rf .git

### 5b: props.children and proptypes

- Displaying the login form only when appropriate

- The components children, aka props.children
  - props.children are used for referencing the child components of a component
  - For this, we have to add a closing tag for the parent component (see Togglable component for example)

- State of the forms
  - The React docs say when several components need to reflect the same changing data, we should lift the shared state up to their closest common ancestor

- References to components with ref
  - We can access variables inside of a component from outside of that component using React's ref mechanism.
  - The useRef hook is used to create a ref, which acts as a reference to the component. It ensures the same ref is kept throughout re-renders of the component.
  - This is used with the useImperativeHandle hook, and a forwardRef function.
  - Note: we could have done this cleaner using class components.

- One point about components
  - When using components similar to Togglable, each instant will have their own separate state

- PropTypes
  - We can enforce expectation and requirement of a component's props using the prop-types package
    - After installing it, we can adding a .propTypes property to the component.
  - The app still works if the prop doesn't conform, but produces an error message which is bad practice.
  
- ESlint (for the frontend)
  - Create-react-app has installed ESlint to the project by default
  - NB: Do not run the eslint --init command.  It will install the latest version of ESlint that is not compatible with the configuration file created by create-react-app!
  - Simply create the .eslintrc.js file manually
  - npm add --save-dev eslint-plugin-jest to avoid undesired and irrelevant linter errors
  - NOTE: If you are using Visual Studio Code together with ESLint plugin, you might need to add additional workspace setting for it to work. If you are seeing Failed to load plugin react: Cannot find module 'eslint-plugin-react', additional configuration is needed. Adding line "eslint.workingDirectories": [{ "mode": "auto" }] to settings.json in the workspace seems to work. 
  - Create an .eslintignore file to ignore node_modules and build directories

### 5c Testing React apps
There are many different ways to test React. Here, we will use:
  - Jest
  - react-testing-library for rendering components for testing purposes (install @testing-library/react & @testing-library/jest-dom if not already)

- Rendering the component for tests
  - Test for individual components usually go in same folder as the component
  - Using the render method, we can render components in a format suitable for tests without rendering them to the actual DOM.
  - render returns an object with several properties. For example, the container property contains all the HTML rendered by the component.

- Searching for content in a component
  - Thereare multiple ways to investigate the content of components being tested
    - eg by container content, .getByText, .querySelector (see testing library site for more types of queries)

- Debugging tests
  - We can print to the console the HTML rendered by the component by using .debug() on an instance of it
  - Search for smaller parts by importing prettyDOM from @testing-library/dom
    - eg console.log(prettyDOM(htmltagexample))

- Clicking buttons in tests
  - Test event handlers by importing fireEvent from @testing-library/react
  - and defining a mock function with Jest

- Tests for the Togglable component

- Testing the forms
  - can be done by using the .change and .submit methods of fireEvent

- Test coverage
  - can be given by using: CI=true npm test -- --coverage
  - A quite primitive HTML report will be generated to the coverage/lcov-report directory.

- Frontend integration tests
  - Integration testing tests the collaboration of multiple components. 

- Snapshot testing
  - As opposed to traditional testing, we don't need to define any tests themselves - it is simplyn enough to adopt snapshot testing
  - It compares the HTML code defined by components after they have changed versus the code before it changed
  - Any changes will be due to either new functionality or a bug - and the developer can tell Jest if the change was desired or not. If not, it strongly implicates a bug.

### 5d End to End (E2E) testing 
  - Testing the system as a whole
  - Using a browser and a testing library eg Selenium, Cypress
  - Testing of system through same interface as user
  - Drawbacks: more complex than unit tests, slow, and can be flaky (may pass and fail on same code)

- Cypress
  - Easier to use than Selenium
  - Unlike other testing libraries which are run in a Node process, Cypress is run in the browser
  - Cypress tests can be in either the frontend, backend or separate repository
  - install in the frontend: npm i --save-dev cypress
  - The tests require the tested system to be running, so add a script to the backend package.json:
    - "start:test": "cross-env NODE_ENV=test node index.js"
    - and make sure we run this rather than "npm run dev"
  - When we run the script "npm run cypress:open" (in the frontend since that's where we installed it), it creates a Cypress directory
  - It uses Mocha under the hood, so we can use describe, it, etc
  - It allows use of Cypress commands such as cy.visit, cy.contains etc
  - 

- Writing to a form
  - cy.get('#login-button'), cy.type('hello world)

- Some things to note
  - Get rid of unnecessary ESlint notifications by installing: npm install eslint-plugin-cypress --save-dev
  - And add "cypress/globals": true to the env variables in the eslintrc.js config file, and "cypress" to the "plugins" variables

- Testing new note form
  - All changes to the browser's state are reversed after each test

- Controlling the state of the database
  - As with unit and integration tests, we should empty then format the database before running tests
  - Since E2E tests don't have access to the db, create API endpoints to the backend for the test by creating a new (controller) router for testing
    - and add it to the backend only if the app is run on test-mode
  - Amend the beforeEach in the test file so that it 
    - resets the db eg cy.request('POST', 'hcy.request('POST', 'http://localhost:3001/api/testing/reset'))
    - and creates seed users/notes eg cy.request('POST', 'http://localhost:3001/api/users/', user)

- Failed login test
  - run only a single Cypress test usting .only (eg. it.only)
  - We can chain cypress functions

- Bypassing the UI
  - We only need to test the login flow once, rather than at the start of each test or in a beforeEach block
  - Rather, we should bypass the UI and HTTP request to the backened to login. This is faster than filling in a form.
    - This involves putting the credentials in the cy.request parameters
  - Under the hood, all Cypress commands are like promises
  - Create custom commands in cypress/support/commands.js, for example if we use the bypass ui login code in multiple places

- Changing the importance of a note
  - When a html element or tag is nested inside something, you can use .parent() and then look inside that.
  - .as('variableName') can be used to help keep code DRY, by assigning a temporary variable name to the element being referred to, then accessed using cy.get('@variableName')

- Running and debugging the test
 - Note Cypress does not work exactly like standard JS. Every command always returns undefined.
 - Cypress can be run using the graphical test runner in a visual browser, or from the command line using the npm script: cypress run
  - Note that this saves the video of the test execution to cypress/videos/, so .gitignore this

---
## 6: State management with Redux
Moving state management outside of React components using the currently most popular solution, Redux.

### 6a: Flux-architecture and Redux
#### Flux-architecture
- In Flux, state is separated completely from the components into its own stores. State in the store is not changed directly, but with  different actions.
- When an action changes the state of the store, the views are re-rendered:
  Action -> Dispatcher -> Store -> View
- If an action, eg pushing a button, causes the need to change the starte, this causes a re-render again.
- Flux manages how and where the application's state is kept, and how it is modified.

#### Redux
- Redux works with the same principle as Flux, but is simpler
- install Redux: npm i redux
- The whole state of the app is stored in a single JS object in the store
- The state of the store is changed with actions. These are objects which have at least a field which determines the type of the action, eg type: 'INCREMENT'
- The impact of the action to the state of the application is defined using a reducer.
  - it is a function which is given the current state and an action as parameters, and returns a new state
  - createStore function from redux is used to create the store from the reducer, which handles actions by dispatching/sending thme to the store with the dispatch method eg store_name.dispatch({type: 'INCREMENT'})
  - The state of the store can be found by using getState eg store.getState()
  - function subscribe is used to create callback functions the store calls when its state is changed
  - when state in the store is changed, React is unable to auto re-render, so we need to register a function which listens for changes in the store with the subscribe method and re-renders for us.

#### Redux-notes
#### Pure functions, immutable
- Reducers should be pure functions ie they do not cause any side effects, and must always return the same response when called with the same parameters.
- Reducer states should also be composed of immutable objects. If there is a change in state, the old object should not be changed, but replaced with a new, changed, object.
- library deep-freeze ensures reducers are correctly defined as immutable functions, using the function deepFreeze(state)
- we can test reducers using jest in the normal way.
  - If we put in some test data, we can use eg expect(storeName).toHaveLength(1)
  - or expect(storeName).toContainEqual(state[0])

#### Array spread syntax
- The spread syntax can be used to break up an array into individual elements
- When we take elements from an array by destructuring, we can also gather the rest of the elements

#### Uncontrolled form
- Forms where the state of the form fields are not bound to the state of the component

#### Action creators
- It is not necessary for React components to know the Redux action types and forms, so we can separate actions into their own functions
- Functions that create actions are called action creators

#### Forwarding Redux-store to various components
- We can share the redux-store with components using the hooks-api after installing the react-redux library
- The application (ie the App component in index.js) has to be defined as a child of a Provider component provided by the react-redux library, with the application's store given to the provider as its attribute store
- If the application has many components which need the store, the App-component must pass store as props to all of those components.
- A module can have only one default export, but multiple 'normal' exports, which can be imported using the curly brace syntax 
  - eg import { createNote } from './../reducers/noteReducer'
- the useDispatch() hook can replace the store.dispatch() function
  - this provides any React component access to the dispatch-function of the redux-store defined in index.js, allowing all components to make changes to the state of the redux-store.
- the component can access the notes stored in the store with the useSelector hook of the react-redux library, which receives a function as a parameter.

#### More components
- presentational components aren't aware the event handler it gets as props dispatches an action
- container components are those that contain some application logic; it defines what the event handlers of its child components do, and coordinates the config of presentational components

### 6b: Many reducers

### 6c: Communicating with server in a redux application

### 6d: Connect