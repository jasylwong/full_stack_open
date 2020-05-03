import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) => <h2>{text}</h2>

const Button = ({addCount, text}) => (
  <button onClick={addCount}>{text}</button>
)

const Display = ({option, optionCount}) => <div>{option} {optionCount}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <>
      <Heading text={'Give feedback'} />
      <Button addCount={addGood} text={'Good'} />
      <Button addCount={addNeutral} text={'Neutral'} />
      <Button addCount={addBad} text={'Bad'} />
      <Heading text={'statistics'} />
      <Display option={"good"} optionCount={good} />
      <Display option={"neutral"} optionCount={neutral} />
      <Display option={"bad"} optionCount={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
