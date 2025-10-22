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

  c

  d