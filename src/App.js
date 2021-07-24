import React, { useEffect, useState } from 'react';
import contactService from './services/contactServices'
import Person from './components/Person';
import Form from './components/Form';
import Filter from './components/Filter';
import Notification from './components/Notification';
import utils from './utils/misc';
import notify from './utils/notify';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ notification, setNotification ] = useState(notify().reset);
  
  
  const {
    cleanNumber,
    personsFindName,
    personsFindNameAndNum
  } = utils;

  useEffect(() => {
    contactService
      .getAll()
      .then(data => setPersons(data))
  }, []);

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(notify().reset);
    }, 5000);
  }

  const resetState = () => {
    setNewName('');
    setNewNumber('');
    resetNotification();
  }

  const addPerson = (event) => {
    event.preventDefault();
    const cleanNewNumber = cleanNumber(String(newNumber));
    const newPerson = {
      name: newName,
      number: cleanNewNumber
    };
    const nameAndNumIndex = personsFindNameAndNum(persons, newPerson);
    const nameIndex = personsFindName(persons, newPerson);

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
            setNotification(notify(newPerson.name).success.update);
            resetState();
          })
          .catch(error => {
            console.log(error);
            setNotification(notify(newPerson.name).error.update)
            setNotification(notify().reset);
        }) 
      }
    } else {
      contactService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data));
          setNotification(notify(newPerson.name).success.add);
          resetState();
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
      <Notification notification={notification}/>
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
          return (
            <Person 
              key={person.name + person.number} 
              id={person.id}
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