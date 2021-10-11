import React from 'react'
import inputStyles from '../styles/inputs.module.css'

export const AnimatedInput = ({handleInputChange, name, type, label}) => {

  return (
    <div className={inputStyles["content-input"]}>

        <input onChange={handleInputChange} className={inputStyles.form__input} name={name} type={type} required />

        <label className={inputStyles.label}>{ label }</label>

    </div>
  )
}
