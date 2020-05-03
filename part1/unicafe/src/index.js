import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) => <h2>{text}</h2>

const Button = ({addCount, text}) => (
  <button onClick={addCount}>{text}</button>
)

const Statistic = ({text, stat}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0 ) { return <div>No feedback given</div>}
  
  return (
    <table>
      <tbody>
        <Statistic text={"good"} stat={props.good} />
        <Statistic text={"neutral"} stat={props.neutral} />
        <Statistic text={"bad"} stat={props.bad} />
        <Statistic text={"all"} stat={props.all} />
        <Statistic text={"average"} stat={props.average} />
        <Statistic text={"positive"} stat={props.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  let all = good + neutral + bad
  let average = (good + (bad * -1))/ all
  let positive = `${(good / all) * 100}%` 

  return (
    <>
      <Heading text={'Give feedback'} />
      <Button addCount={addGood} text={'Good'} />
      <Button addCount={addNeutral} text={'Neutral'} />
      <Button addCount={addBad} text={'Bad'} />
      <Heading text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}
        average={average} positive={positive}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
