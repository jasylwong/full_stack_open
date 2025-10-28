const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.hasrmay.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FullstackOpen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// Generaring new note code:
// const note = new Note({
//   content: 'HTML is easy 3',
//   important: false
// })

// note.save().then(result =>{
//   console.log('note saved!')
//   console.log(result)
//   mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})