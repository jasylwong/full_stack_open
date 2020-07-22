import React, { useEffect } from 'react';
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import './App.css';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])

  return (
    <div className="App">
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;

