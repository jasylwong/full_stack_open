import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const History = () => <p>{allClicks.join('')}</p>
    
  return(
    <>
      <button onClick={handleLeftClick}>Left</button>
      {left}
      <button onClick={handleRightClick}>Right</button>
      {right}
      <History allClicks={allClicks} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
