import React, { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('')
  
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
    </div>
  )
}

export default App;
