require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', request => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`
      <p>Phonebook has info for ${result.length} people</p>
      <p>${Date()}</p>
    `)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons =>{
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name &/or number missing' })
  }

  const personExists = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())
  if (personExists) {
    return response.status(409).json({ error: 'name must be unique!' })
  }

  const person = new Person({
    "name": body.name,
    "number": body.number
  })

  person.save().then(result => {
    response.json(person)
  })
})

app.put('/api/persons/:id', (request, response) => {    
  Person.findById(request.params.id).then(person => {
    person.number = request.body.number

    person.save().then(result => {
      response.json(person)
    })
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Phonebook server listening on port ${PORT}`)
})