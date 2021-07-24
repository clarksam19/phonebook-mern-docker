const Person = ({ id, person, onClick }) => {
  return (
    <li id={id} data-name={person.name}>
      {person.name} 
      {person.number}
      <button onClick={onClick}></button>
    </li>
  )
}

export default Person;