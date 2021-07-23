const Filter = ({ type, value, onChange }) => {
  return (
    <label>filter contacts: 
      <input
        type={type} 
        value={value}
        onChange={onChange} 
      />
    </label>
  )
}

export default Filter;