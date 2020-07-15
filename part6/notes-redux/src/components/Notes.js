import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

// const Note = (props) => {
//   return (

//   )
// }

const Notes = ({ notes }) => {
  const dispatch = useDispatch()

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <ul>
      {notes.map(note =>
        <li
          key={note.id}
          onClick={() => toggleImportance(note.id)}
        >
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      )}
    </ul>
  )
}

export default Notes