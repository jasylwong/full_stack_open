import React from 'react'

function Note({ note, toggleImportanceOfNote }) {
  return (
    <>
      <li className='note'>
        {note.content}<button onClick={toggleImportanceOfNote}>Make {note.important ? 'not' : ''} important</button>
      </li>
    </>
  )
}

export default Note
