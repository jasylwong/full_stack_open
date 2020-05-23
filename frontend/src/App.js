import React, { useState } from 'react';
import Note from './components/Note';
import './App.css';

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note')

   const handleSubmit = () => {
    //  setNotes(notes)
     console.log('Submitted!')
   }

   const handleChange = (event) => {
     console.log(event.target.value)
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
      <form onSubmit={() => handleSubmit()}>
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
