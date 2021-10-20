import React from 'react'
import inputStyles from '../styles/inputs.module.css'

export const AnimatedInput = ({handleInputChange, name, type, label, value}) => {

  /* console.log(value); */

  return (
    <div className={inputStyles["content-input"]}>

        <input onChange={handleInputChange} defaultValue={value} className={inputStyles.form__input} name={name} type={type} required  autoComplete="off" />

        <label className={inputStyles.label}>{ label }</label>

    </div>
  )
}
