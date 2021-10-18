import React, { useContext } from 'react'
import styles from '../styles/modal.module.css'
import createStyles from '../styles/create.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { AnimatedInput } from './AnimatedInput'
import { ModalContext } from '../context/ModalContext'

export const Modal = ({show = false}) => {

  const { setShowModal } = useContext(ModalContext)

  const closeModal = (e) => {

    e.preventDefault()
    setShowModal(false)

  }

  const onChange = () => {
    console.log("A");
  }

  return (
    
    <>

      { show && 

        <div className={styles.modal}>
        
          <div className={styles.topModal}>
            
            <div onClick={closeModal} className={styles.closeButton}>
              x
            </div>

            <h2 className={styles.title}>Editar Perfil</h2>

          </div>

          <div className={styles.imageContainer}>

            <img className={styles.modalImage} src="https://play-lh.googleusercontent.com/IlnBc1ca_20U3qacgXrkXM_opQK9gvTXryaPSCCPCanD_o_hPdgPQkhQ6-DcsfSZ9PU9=s360" />
            
            <button className={`${buttonStyles.form__button} ${buttonStyles.buttonBlueModal}`}>Cambiar</button>
            
          </div>

          <form className={createStyles.form}>

            <AnimatedInput handleInputChange={onChange} label="Nombre" name="user" type="text" />

            <AnimatedInput handleInputChange={onChange} label="Titulo" name="title" type="text" />

            <div className={styles.bgContainer}>

              <div className={`${styles.options} ${styles.opt1}`} />
              <div className={`${styles.options} ${styles.opt2}`} />
              <div className={`${styles.options} ${styles.opt3}`} />
              <div className={`${styles.options} ${styles.opt4}`} />

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
