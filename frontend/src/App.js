import React, { useState } from 'react';
import './App.css';

function Button({ handleClick, word }) {
  return (
    <button onClick={() => handleClick(word)} >{word}</button>
  )
}

function App() {
  const [counter, setCounter] = useState(0)

  const handleClick = (word)  => {
    console.log(word)
    setCounter(counter + 1)
  }

  return (
    <div className="App">
      <div>{counter}</div>
      <Button handleClick={handleClick} word={'left'} />
      <Button handleClick={handleClick} word={'right'} />
    </div>
  );
}

export default App;
