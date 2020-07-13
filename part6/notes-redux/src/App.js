import React from 'react';
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'
import './App.css';

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'hello world',
    important: 'true',
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'how are you?',
    important: 'true',
    id: 2
  }
})

function App() {
  return (
    <div className="App">
      {store.getState().map(note =>
        <div key={note.id}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
