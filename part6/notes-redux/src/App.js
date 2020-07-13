import React from 'react';
import { createStore } from 'redux'
import './App.css';

const noteReducer = (state=[], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.data)
  }

  return state
}

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

console.log(store.getState())

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
