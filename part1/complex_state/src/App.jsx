import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

function App() {
  const [value, setValue ] = useState(0)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  } 

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text='thousand'/>
      <Button onClick={() => setToValue(0)} text='reset'/>
      <Button onClick={() => setToValue(value + 1)} text='increment'/>
    </div>
  )
}

export default App
