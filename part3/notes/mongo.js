const mongoose = require('mongoose')

if ( process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jasylwong:${password}@cluster0-7yxwh.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'second test',
//   date: new Date(),
//   important: false,
// })

// note.save().then(response => {
//   console.log('note saved!')
//   console.log(response);
//   mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// Note.deleteOne({ _id: Object("5eb7e3780261146d307e5dfc") }).then(result => {
//   console.log('note deleted')
//   mongoose.connection.close()
// })

