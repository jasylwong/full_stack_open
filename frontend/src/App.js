import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes'
import './App.css';

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNoteToAdd =   {
      content: newNote,
      date: new Date().toISOString(),
      important: true
    }

    noteService.create(newNoteToAdd)
      .then(response => {
        setNotes([...notes, response])
        setNewNote('')
      })
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const filteredNotes = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOfNote = (id) => {
    const note = notes.find(note => note.id === id)
    const amendedNote = { ...note, important: !note.important}

    noteService.update(id, amendedNote)
      .then(response => {
        setNotes(notes.map(note => id === note.id ? response : note))
      })
  }

  console.log(notes)

  return (
    <div className="App">
      <h2>Notes</h2>
      {
        filteredNotes.map(note => {
          return <Note key={note.id} note={note} toggleImportanceOfNote={() => toggleImportanceOfNote(note.id)}/>
        })
      }
      <button onClick={toggleImportance}>Show {showAll ? 'important' : 'all'}</button>

      <h2>Add a note</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Note:
          <input type='text' name='name' value={newNote} onChange={handleChange}/>
        </label>
        <input type='submit' value='Submit' />
      </form>
      <br />
    </div>
  );
}

export default App;
