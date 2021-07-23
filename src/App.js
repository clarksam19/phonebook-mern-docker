import React, { useState } from 'react';
import Person from './components/Person';
import Form from './components/Form';
import Filter from './components/Filter';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040123456' },
    { name: 'Ada Lovelace', number: '39445323523' },
    { name: 'Dan Abramov', number: '1243234345' },
    { name: 'Mary Poppendieck', number: '39236423122' }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const cleanNumber = (stringNumber) => {
    return stringNumber.replace(/[\W_]/g, '');
  }

  const cleanName = (name) => {
    return name.replace(/[\W_]/g, '');
  }

  const personsContains = (newPerson) => {
    const cleanNewNumber = cleanNumber(newPerson.number);
    console.log(cleanNewNumber);
    return persons.findIndex(person => {
      return cleanName(person.name) === cleanName(newPerson.name) && person.number === cleanNewNumber;
    }) > -1;
  }

  const addPerson = (event) => {
    event.preventDefault();
    const cleanNewNumber = cleanNumber(String(newNumber));
    const newPerson = {
      name: newName,
      number: cleanNewNumber
    };
    if (personsContains(newPerson)) {
      alert(`${newPerson.name} is already in the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    } 
  }

  const display = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        type="text" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
      />
      <h2>Add Contact</h2>
      <Form 
        onSubmit={addPerson}
        values={{name: newName, number: newNumber}}
        onChanges={{
          name: (e) => setNewName(e.target.value),
          number: (e) => setNewNumber(e.target.value)
        }}
      />
      <h2>Contacts</h2>
      <ul>
        {display.map(person => {
          <Person 
            key={person.name + person.number} 
            person={person}
          /> 
        })}
      </ul>
    </div>
  )
}

export default App