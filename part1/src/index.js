import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Hello = (props) => (
  <div>
    <p>Hello {props.name}, you are {props.age} years old</p>
  </div>
)

const App = () => {
  const name = "Bobby";
  const age = 10;

  return(
    <div>
      <Hello name={name} age={age + 10}/>
      <Hello />
      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
