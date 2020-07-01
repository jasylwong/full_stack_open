import React from 'react'

function Note({ note, toggleImportanceOfNote }) {
  return (
    <>
      <li className='note'>
        {note.content}<button onClick={toggleImportanceOfNote}>{note.important ? 'Make not important' : 'Make important'}</button>
      </li>
    </>
  )
}

export default Note
