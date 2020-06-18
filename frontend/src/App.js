import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes'
import './App.css';

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject =   {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes([...notes, returnedNote])
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOfNote = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => id === note.id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={toggleImportance}>Show {showAll ? 'important' : 'all'}</button><br /><br />
      {
        notesToShow.map(note => {
          return <Note key={note.id} note={note} toggleImportanceOfNote={() => toggleImportanceOfNote(note.id)}/>
        })
      }

      <h2>Add a note</h2>
      <form onSubmit={addNote}>
        <label>
          Note:
          <input type='text' name='name' value={newNote} onChange={handleNoteChange}/>
        </label>
        <input type='submit' value='Submit' />
        <div className='note'>(Notes must be at least 5 characters long)</div>
      </form>
      <br />
      <Footer />
    </div>
  );
}

export default App;
