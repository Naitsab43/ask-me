import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/modal.module.css'
import profileStyles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { AnimatedInput } from './AnimatedInput'
import { ModalContext } from '../context/ModalContext'
import { useForm } from '../hooks/useForm'
import { Selected } from './Selected'

export const Modal = ({show = false, data}) => {

  const [selected, setSelected] = useState({
    cool: false,
    purple: false,
    poker: false,
    fruits: false,
    animals: false,
    default: false,
  })

  const { setShowModal } = useContext(ModalContext)

  const [values, handleInputChange] = useForm({
    user: data.user,
    title: data.title,
  })

  const backgroundSelected = (selectedItem) => {

    if(selected[selectedItem]){
      return
    }
    
    setSelected({
      cool: false,
      purple: false,
      poker: false,
      fruits: false,
      animals: false,
      default: false,
      [selectedItem]: !selected[selectedItem] 
    })

  }

  const closeModal = (e) => {

    e.preventDefault()
    document.getElementsByTagName("body")[0].style = ""
    setShowModal(false)

  }

  useEffect(() => {

    selected[data.background] = true

  }, [])

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

            <img className={styles.modalImage} src="https://www.wallpaperuse.com/wallp/54-548934_m.jpg" />
            
            <button className={`${buttonStyles.form__button} ${buttonStyles.buttonBlueModal}`}>Cambiar</button>
            
          </div>

          <form className={createStyles.form}>

            <AnimatedInput handleInputChange={handleInputChange} value={data.user} label="Nombre" name="user" type="text" />

            <AnimatedInput handleInputChange={handleInputChange} value={data.title} label="Titulo" name="title" type="text" />

            <div className={styles.bgContainer}>

              <div onClick={() => backgroundSelected("cool")} className={`${styles.options} ${profileStyles.cool}`} >
                <Selected visible={selected.cool} />
              </div>

              <div onClick={() => backgroundSelected("purple")} className={`${styles.options} ${profileStyles.purple}`} >
                <Selected visible={selected.purple} />
              </div>

              <div onClick={() => backgroundSelected("poker")} className={`${styles.options} ${profileStyles.poker}`} >
                <Selected visible={selected.poker} />
              </div>

              <div onClick={() => backgroundSelected("fruits")} className={`${styles.options} ${profileStyles.fruits}`} >
                <Selected visible={selected.fruits} />
              </div>
              
              <div onClick={() => backgroundSelected("animals")} className={`${styles.options} ${profileStyles.animals}`} >
                <Selected visible={selected.animals} />
              </div>

              <div onClick={() => backgroundSelected("default")} className={`${styles.options} ${profileStyles.default}`} >
                <Selected visible={selected.default} />
              </div>

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
