import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
        console.log(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNoteToAdd =   {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: true
    }
    setNotes([...notes, newNoteToAdd])
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const filteredNotes = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = () => {
    setShowAll(!showAll)
  }

  return (
    <div className="App">
      <h2>Notes</h2>
      {
        filteredNotes.map(note => {
          return <Note key={note.id} note={note} />
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
