Full Stack Open

Part 0: Fundamentals of Web apps

```
npm create vite@latest
npm run dev
```


Part 1: Introduction to React
c Component state, event handlers
- Component helper functions
- Destructuring
- Page re-rendering
- Stateful component
- Event handling
- An event handler is a function
- Passing state - to child components
- Changes in state cause re-rendering
- A more complex state, debugging React apps
  - Complex state
  - Handling arrays
  - Update of the state is asynchronous
  - Conditional rendering
  - Old React
  - Debugging React applications
  - Rules of Hooks
  - Event Handling revisited
  - A function that returns a function
  - Passing Event Handlers to Child Components
  - Do Not Define Components Within Components
  - Web programmers oath
  - Utilization of Large language models
  - Exercises 1.6 - 1.14

  Part 2: Communicating with a server
  a Rendeirng a collection, modules
  - console.log
  - protip: Visual Studio Code snippets
  - JavaScript Arrays
  - Event Handlers Revisited
  - Rendering Collections
  - Key-attribute
  - Map
  - Anti-pattern: Array Indexes as keys
  - Refactoring Modules
  - When the Application Breaks
  - Web developer's oath
  - Exercises 2.1 - 2.5
  
  b Forms
  - Saving the ntoes in the component state
  - Controlled component 
  - Filtering Displayed Elements
  - Exercises 2.6 - 2.10
  
  c Getting data from server
  - The browser as a runtime environment
  - npm
  - Axios and promises
    - A Promise is an object representing the eventual completion or failure of an asynchronous operation. There are 3 states: pending, fulfilled, rejected
  - Effect-hooks
  - The development runtime environment
  - Exercise 2.11

  d Altering data in server
  - REST
  - Sending Data to the Server
  - Changing the Importance of Notes
  - Extracting communication with the backend into a separate module
  - Cleaner syntax for defining object literals
  - Promises and Errors
  - Full stack developer's oath: Use all the possible means to make it easier:
    - Have browser developer console open all the time
    - Use the network tab of the browser dev tools to ensure that frontend and backend are communicating as I expect
    - Constantly keep an eye on the state of the server to make sure that the data sent there by the frontend is saved there as I expect (React component browser extension)
    - Progress with small steps
    - write lots of console.log statements to make sure I understand how the code behaves and to help pinpoint problems
    - If my code does not work, I will not write more code. Instead, I start deleting the code until it works or just return to a state when everything was still working
  - Exercises 2.12 - 2.15

  e Adding styles to React app
      HTML: content, CSS: style, JS: functionality
  - Improved error message
  - Inline styles
  - Exercises 2.16 - 2.17
  - Couple of important remarks
  - Exercises 2.18-2.20

  Part 3: Programming a server with NodeJs and Express
  a Node.js and Express
  - Simple web server
    - `npm init` to create a new project
  - Express
    - `npm install package-name`
    - `npm install` to install dependencies of a project
    - `npm update` to update dependencies
  - Web and Express
    - Command line `node` to use interactive node-repl
  - Automatic Change Tracking
    - Make server track our changes automatically by starting it with `--watch` option, ie `node --watch index.js`
  - REST
  - Fetching a single resource
  - Deleting resources
  - Postman
  - The Visual Studio Code REST client
  - The WebStorm HTTP Client
  - Receiving data
  - Exercises 3.1 - 3.6
  - About HTTP request types
    - Safety & idempotence
  - Middleware
    - Functions can be used for handling request & response objects
  - Exercises 3.7 - 3.8
    - Logging with https://github.com/expressjs/morgan

  b Deploying app to internet
  - Same origin policy and CORS
  - Application to the Internet
  - Frontend production build
    - `npm run build`
  - Serving static files from the backend
  - The whole app to the internet
  - Streamlining deploying of the frontend
  - Proxy
  - Exercises 3.9 - 3.11
    https://full-stack-open-phonebook-mxht.onrender.com/api/persons

  c Saving data to MongoDB
  - Debugging Node applications
    - Be systematic, logging to the console, Postman, debuggers, Developer console, question everything
    - Worst strategy: continue writing code 
  - MongoDB: Document database, under the NoSQL umbrella term
  - Schema
  - Creating and saving objects
  - Fetching objects from the database
  - 3.12
  - Connecting the backend to a database
  - Moving db configuration to its own module
  - Defining the environment variables using the dotenv library
  - Using database in route handlers
  - Verifying frontend and backend integration
    - When backend gets expanded, good idea to test the backend first with the browser, Postman or the VS Code REST client. Highly inefficient to test things exclusively through the frontend.
  - A true full stack developer's oath
  - Exercises 3.13 - 3.14
  - Error handling
  - Moving error handling into middleware
  - The order of middleware loading
  - Other operations
  - Exercises 3.15 - 3.18

  d Validation and ESLint
  - Deploying the database backend to production
  - Exercises 3.19 - 3.21
  - Lint
  - Formatting the Configuration File
  - Running the Linter
  - Adding More Style Rules
  - Exercise 3.22

  Part 4: Testing Express servers, user administration
  a Structure of backend application, introduction to testing
  - Project structure
  - Note on exports
  - Exercises 4.1 - 4.2
  - Testing Node applications
  - Exercises 4.3 - 4.7

  b Testing the backend
  - Test environment
  - supertest
  - Initializing the database before tests
  - Running tests one by one
    - npm test -- tests/note_api.test.js
    - npm test -- --test-name-pattern="a specific note is within the returned notes"
      - can contain just part of a name too
  - async/await
  - async/await in the backend
  - Refactoring the route responsible for adding a note
  - Refactoring the route responsible for fetching a single note
  - Refactoring the route responsible for deleting a note
  - Optimizing the beforeEach function
  - A true full stack developer's oath
  - Exercises 4.8 - 4.12
    - Generally shouldn't be using async/await AND then methods in the same code
  - Refactoring tests
  - Exercises 4.13 - 4.14

  c User administration
  - References across collections
  - Mongoose schema for users
  - Creating users
    bcrypt package for generating password hashes
  - Creating a new note
  - Populate
    - linking user & notes
    - the database does not know that the ids stored in the user field of the notes collection reference documents in the user collection. The functionality of the populate method of Mongoose is based on the fact that we have defined "types" to the references in the Mongoose schema with the ref option

  d Token authentication
    - jsonwebtoken library
  - Limiting creating new notes to logged-in users
  - Problems of Token-based authentication
    - Easy to implement, but access rights need a way to be revoked (ie by expiry or server-side sessions)
  - End notes
  - Exercises 4.15 - 4.23
    - use --test-concurrency=1 to execute tests sequentially

  Part 5: Testing React apps
  a Login in frontend
  - Adding a Login Form
  - Adding Logic to the Login Form
  - Conditional Rendering of the Login Form
  - Note on Using the Label Element
  - Creating new notes
  - Saving the token to the browser's local storage
  - Exercises 5.1 - 5.4
  - A note on using local storage
  
  b props.children and proptypes
  - Displaying the login form only when appropriate
  - The components children, aka. props.children
  - State of the forms
  - References to components with ref
  - One point about components
  - The updated full stack developer's oath
  - Exercises 5.5 - 5.11
  - ESlint
  - Exercise 5.12

  c Testing React apps
  - Rendering the component for tests
  - Test file location
  - Searching for content in a component
  - Debugging tests
    - screen.debug(element) prints the HTML of a component called element to terminal. element is optional
  - Clicking buttons in tests
    - npm install --save-dev @testing-library/user-event
  - Tests for the Togglable component
  - Testing the forms
  - About finding the element
  - Test coverage
    - npm test -- --coverage
  - Exercises 5.13 - 5.16
  - 
  - 
  
  d
  e


User:
- tests & helper