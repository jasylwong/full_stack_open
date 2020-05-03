import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) => <h2>{text}</h2>

const Button = ({addCount, text}) => (
  <button onClick={addCount}>{text}</button>
)

const Statistic = ({text, stat}) => <div>{text} {stat}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  let all = good + neutral + bad
  let average = all === 0 ? 0 : (good + (bad * -1))/ all
  let positive = all === 0 ? '0%' : `${(good / all) * 100}%` 

  let stats = () => {
    if (all !== 0 ) {
      return (
        <>
        <Statistic text={"good"} stat={good} />
        <Statistic text={"neutral"} stat={neutral} />
        <Statistic text={"bad"} stat={bad} />
        <Statistic text={"all"} stat={all} />
        <Statistic text={"average"} stat={average} />
        <Statistic text={"positive"} stat={positive} />
        </>
      )
    } else {
      return 'No feedback given'
    }
  }

  return (
    <>
      <Heading text={'Give feedback'} />
      <Button addCount={addGood} text={'Good'} />
      <Button addCount={addNeutral} text={'Neutral'} />
      <Button addCount={addBad} text={'Bad'} />
      <Heading text={'statistics'} />
      {stats()}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
