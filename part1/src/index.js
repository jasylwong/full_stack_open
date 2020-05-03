import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Display = ({value}) => <div>{value}</div>
  
const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    setValue(newValue)
  }

  const Button = ({setToValue, text}) => (
    <button onClick={setToValue}>{text}</button>
  )

  return (
    
    <div>
      <Display value={value} />
      <Button setToValue={() => setToValue(1000)} text={'thousand'} />
      <Button setToValue={() => setToValue(0)} text={'reset'} />
      <Button setToValue={() => setToValue(value + 1)} text={'increment'} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));
