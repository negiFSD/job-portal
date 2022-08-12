import React from 'react'

function FormRow({ type, name, value, handleChange, labelText }) {
  return (
    <div className='form-row'>
          <label htmlFor={name} className='form-label'>
            {name}
          </label>
          <input
            type={type}
            value={value}
            name={name}
            onChange={(e)=>handleChange(e)}
            className='form-input'
            placeholder={name}
          />
        </div>
  )
}

export default FormRow