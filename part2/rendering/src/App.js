import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes'
import Footer from './components/Footer';


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)        
      })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService.create(noteObject)
      .then(initialNotes => {
        setNotes(notes.concat(initialNotes))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
    .catch(error => {
      setErrorMessage( `Note '${note.content}' was already removed from the server`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>  
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)} >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button value='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;