const Form = ({ onSubmit, values, onChanges }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>name: 
          <input
            type="text" 
            value={values.name}
            onChange={onChanges.name}
          />
        </label>
        <label>number: 
          <input 
            type="tel"
            value={values.number}
            onChange={onChanges.number}
          />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form;