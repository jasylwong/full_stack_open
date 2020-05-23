import React, { useState } from 'react';
import Note from './components/Note';
import './App.css';

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')

   const handleSubmit = (event) => {
    event.preventDefault()
    const newNoteToAdd =   {
      id: notes.length + 1,
      content: newNote,
      date: Date.now(),
      important: true
    }
    setNotes([...notes, newNoteToAdd])
   }

   const handleChange = (event) => {
     setNewNote(event.target.value)
   }

  return (
    <div className="App">
      <h2>Notes</h2>
      {
        notes.map(note => {
          return <Note key={note.id} note={note} />
        })
      }

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
