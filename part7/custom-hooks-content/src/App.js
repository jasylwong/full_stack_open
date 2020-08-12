import React, { useState } from 'react';

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: 
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange} 
        /> 
        <br/> 
        born: 
        <input
          type={born.type}
          value={born.value}
          onChange={born.onChange}
        />
        <br/>
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

export default App


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type, value, onChange
  }
}