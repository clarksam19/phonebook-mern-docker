const cleanName = (name) => {
  return name.replace(/[\W_]/g, '');
}

const cleanNumber = (stringNumber) => {
  return stringNumber.replace(/[\W_]/g, '');
}

const personsFindNameAndNum = (persons, newPerson) => {
  const cleanNewNumber = cleanNumber(newPerson.number);
  return persons.findIndex(person => {
    return cleanName(person.name) === cleanName(newPerson.name) && person.number === cleanNewNumber;
  });
}

const personsFindName = (persons, newPerson) => {
  return persons.findIndex(person => {
    return cleanName(person.name) === cleanName(newPerson.name);
  });
}

const utils = {
  cleanNumber,
  personsFindName,
  personsFindNameAndNum
}

export default utils;