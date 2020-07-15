import React from 'react';
import { useSelector } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import './App.css';

function App() {
  const notes = useSelector(state => state)

  return (
    <div className="App">
      <NewNote />
      <Notes notes={notes} />
    </div>
  );
}

export default App;

