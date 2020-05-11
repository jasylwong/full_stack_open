const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')
require('dotenv').config()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// const url = process.env.MONGODB_URI

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   },
//   {
//     id: 4,
//     content: "Fourth",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()))
  })
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content === undefined) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    res.json(savedNote.toJSON())
  })
})

app.get('/api/notes/:id', (request, response) => {
  const note = Note.findById(request.params.id).then(note => {
    response.json(note.toJSON())
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})