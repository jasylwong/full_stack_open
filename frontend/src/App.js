import React from 'react';
import Note from './components/Note';
import './App.css';

function App({ notes }) {

  return (
    <div className="App">
      {
        notes.map(note => {
          return <Note key={note.id} note={note} />
        })
      }
    </div>
  );
}

export default App;
