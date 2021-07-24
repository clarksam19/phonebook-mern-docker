import React, { useEffect, useState } from 'react';
import contactService from './services/contactServices'
import Person from './components/Person';
import Form from './components/Form';
import Filter from './components/Filter';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    contactService
      .getAll()
      .then(data => setPersons(data))
  }, []);

  const cleanNumber = (stringNumber) => {
    return stringNumber.replace(/[\W_]/g, '');
  }

  const cleanName = (name) => {
    return name.replace(/[\W_]/g, '');
  }

  const personsFindNameAndNum = (newPerson) => {
    const cleanNewNumber = cleanNumber(newPerson.number);
    return persons.findIndex(person => {
      return cleanName(person.name) === cleanName(newPerson.name) && person.number === cleanNewNumber;
    });
  }

  const personsFindName = (newPerson) => {
    return persons.findIndex(person => {
      return cleanName(person.name) === cleanName(newPerson.name);
    });
  }

  const addPerson = (event) => {
    event.preventDefault();
    const cleanNewNumber = cleanNumber(String(newNumber));
    const newPerson = {
      name: newName,
      number: cleanNewNumber
    };
    const nameAndNumIndex = personsFindNameAndNum(newPerson);
    const nameIndex = personsFindName(newPerson);
    if (nameAndNumIndex > -1) {
      alert(`${newPerson.name} is already in the phonebook`);
    } else if (nameIndex > -1) {
      const confirm = window.confirm(`${newPerson.name} is already in the phonebook. Update number?`);
      if (!confirm) {
        return;
      } else {
        const id = persons[`${nameIndex}`].id;
        contactService
          .update(newPerson, id)
          .then(data => {
            setPersons(persons.map(person => {
              return person.id !== id ? person : data;
            }));
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
      contactService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('');
          setNewNumber('');
        })  
    } 
  }

  const deletePerson = (event) => {
    const name = event.target.parentElement.getAttribute('data-name');
    const confirm = window.confirm(`Delete ${name}?`);
    if (!confirm) {
      return;
    } else {
      const id = event.target.parentElement.getAttribute('id');
      contactService
        .remove(id)
        .then(id => {
          const newPersons = persons.filter(person => {
            return person.id !== Number(id);
          });
          setPersons(newPersons);
        });
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
        {display.map((person, idx) => {
          return (
            <Person 
              key={person.name + person.number} 
              id={idx + 1}
              person={person}
              onClick={deletePerson}
            />
          ) 
        })}
      </ul>
    </div>
  )
}

export default App