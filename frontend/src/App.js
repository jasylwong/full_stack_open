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
      content: newNote,
      date: new Date().toISOString(),
      important: true
    }

    axios.post('http://localhost:3001/notes', newNoteToAdd)
      .then(response => {
        console.log(response)
        setNotes([...notes, response.data])
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

    axios.put(`http://localhost:3001/notes/${note.id}`, amendedNote)
      .then(response => {
        setNotes(notes.map(note => id === note.id ? response.data : note))
      })
  }

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
