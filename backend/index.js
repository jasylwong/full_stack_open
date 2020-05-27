// require http
const http = require('http')

// Create server, tell it what headers are, tell it what to show in browser
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain'})
  response.end('Jason is still cool')
})

// Tell it what port to listen for 
const PORT = 3001
app.listen(PORT)

// Log message to show it is running
console.log(`Server is running on port ${PORT}`);
