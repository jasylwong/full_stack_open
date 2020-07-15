import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note }) => {
  const dispatch = useDispatch()
  
  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <li
      onClick={() => toggleImportance(note.id)}
    >
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = ({ notes }) => {
  return (
    <ul>
      {notes.map(note =>
        <Note note={note} key={note.id} />
      )}
    </ul>
  )
}

export default Notes