import React from 'react';

const Persons = ({filteredPersons, persons}) => {
  return (
    <>
      {filteredPersons.map(person => 
        <div key={persons.indexOf(person)}>{person.name} {person.number}</div>)}
    </>
  )
}

export default Persons;