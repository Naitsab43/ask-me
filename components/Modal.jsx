import React from 'react'
import createStyles from '../styles/create.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { AnimatedInput } from './AnimatedInput'

export const Modal = () => {
  
  return (
    <div>
      
      <h2>Editar Perfil</h2>

      <div>

        <img src="https://play-lh.googleusercontent.com/IlnBc1ca_20U3qacgXrkXM_opQK9gvTXryaPSCCPCanD_o_hPdgPQkhQ6-DcsfSZ9PU9=s360" />
        
        <button disabled={disabled} onClick={e => loginUser(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}> { disabled ? "Cargando..." : "Ingresar a mi Q&A" } </button>
        
      </div>

      <form className={createStyles.form}>

        <AnimatedInput handleInputChange={onChange} label="Nombre" name="user" type="text" />

        <AnimatedInput handleInputChange={onChange} label="Titulo" name="title" type="text" />

        <div>

          <div></div>
          <div></div>
          <div></div>

        </div>


        <button disabled={disabled} onClick={e => loginUser(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}> { disabled ? "Cargando..." : "Ingresar a mi Q&A" } </button>

      </form>

    </div>
  )
}
