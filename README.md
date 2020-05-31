# Full stack open

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

3 Programming a server with Node.js and Express
3a Node.js and Express
3b Deploying app to internet
3c Saving data to MongoDB (persisting data in a DB)
- Debugging Node applications: 
  - VS Code debugger
  - Chrome debugger (run using $ node --inspect index.js)
- MongoDB (Atlas)
  - Mongoose is and Object Document Mapper (ODM). It offers a high level API for using a database
    Install as a dependency, and require it in your file.
  - In our file, establish the connection to the database, define the schema and matching model, 
    create the new object, save it, and close the connection.
- Fetching objects from the database
  - using the .find({ conditions }) method of the model, where 'conditions' are the optional 
  conditions of the search
- Backend connected to the DB
  - Do as above in the index.js file, using the appropriate app.get command
  - Modify the toJSON method of the schema, if required
- Database configuration into its own module
  - Using env variables: add .env to .gitignore, create .env file, 
    install and require('dotenv').config()
- Using database in route handlers
  - Posting to db - use newItemName.save()
  - Fetching individual items - use ModelName.findById(id)
- Verifying frontend and backend integration
- Error handling
- Moving error handling into middleware
- The order of middleware loading
- Other operations

3d Validation and ESLint
- Promise chaining
- Deploying the database backend to production
- Lint

4 Testing Express servers, user administration
- Structure of backend application, introduction to testing
- Testing the backend
- User administration
- Token authentication
