import React from 'react'
import styles from '../styles/modal.module.css'
import createStyles from '../styles/create.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { AnimatedInput } from './AnimatedInput'

export const Modal = ({show = false}) => {

  const onChange = () => {
    console.log("A");
  }

  return (
    
    <>

      { show && 

        <div className={styles.modal}>
        
          <h2 className={styles.title}>Editar Perfil</h2>

          <div className={styles.imageContainer}>

            <img className={styles.modalImage} src="https://play-lh.googleusercontent.com/IlnBc1ca_20U3qacgXrkXM_opQK9gvTXryaPSCCPCanD_o_hPdgPQkhQ6-DcsfSZ9PU9=s360" />
            
            <button className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>Cambiar</button>
            
          </div>

          <form className={createStyles.form}>

            <AnimatedInput handleInputChange={onChange} label="Nombre" name="user" type="text" />

            <AnimatedInput handleInputChange={onChange} label="Titulo" name="title" type="text" />

            <div className={styles.bgContainer}>

              <div className={styles.bgOption1} />
              <div className={styles.bgOption2} />
              <div className={styles.bgOption3} />
              <div className={styles.bgOption4} />

            </div>


            <button className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>
              Guardar
            </button>

          </form>

        </div>
      }
      
    </>
  )
}
