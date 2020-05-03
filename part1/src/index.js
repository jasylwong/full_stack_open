import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


  
const App = (props) => {
  const [value, setValue] = useState(10)

  const handleClick = (name) => () => console.log(name)

  return (
    
    <div>
      {value}
      <button onClick={handleClick('Jason')}>Jason</button>
      <button onClick={handleClick('Betty')}>Betty</button>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));
