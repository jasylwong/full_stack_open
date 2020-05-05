import React from 'react';

const Persons = ({filteredPersons, persons, deletePerson }) => {
  return (
    <>
      {filteredPersons.map(person => 
        <div key={persons.indexOf(person)} >
          {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      )}
    </>
  )
}

export default Persons;