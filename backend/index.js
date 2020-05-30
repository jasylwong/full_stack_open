const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
// To make express show static content from the build repo copied from frontend:
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  }) 
})

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response) => {
  // console.log('request.headers: ', request.headers)
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false
  })

  // notes = notes.concat(note)

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})