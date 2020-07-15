import React from 'react';
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import './App.css';

function App() {
  return (
    <div className="App">
      <NewNote />
      <Notes />
    </div>
  );
}

export default App;

