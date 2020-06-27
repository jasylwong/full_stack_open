import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import noteService from './services/notes'
import loginService from './services/login'
import './App.css';

function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOfNote = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    </Togglable>
  )

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }

      <h2>Notes</h2>

      <button onClick={toggleImportance}>Show {showAll ? 'important' : 'all'}</button><br /><br />
      {
        notesToShow.map(note => {
          return <Note key={note.id} note={note} toggleImportanceOfNote={() => toggleImportanceOfNote(note.id)} />
        })
      }
      <br />
      <Footer />
    </div>
  );
}

export default App;
