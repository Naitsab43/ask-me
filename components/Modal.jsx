import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../styles/modal.module.css'
import profileStyles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { AnimatedInput } from './AnimatedInput'
import { useForm } from '../hooks/useForm'
import { Selected } from './Selected'
import { useRouter } from 'next/router'
import { AlertContext } from '../context/AlertContext'
import { ModalContext } from '../context/ModalContext'
import { UserContext } from '../context/UserContext'
import { uploadImage } from '../helpers/uploadImage'
import toast from 'react-hot-toast'
import config from '../config'

export const Modal = ({show = false, background, image, token}) => {

  const router = useRouter()

  const [selected, setSelected] = useState({
    cool: false,
    purple: false,
    poker: false,
    fruits: false,
    animals: false,
    default: false,
  })

  const [modalImage, setModalImage] = useState({
    file: null,
    image: null
  })

  const [disable, setDisable] = useState(false)

  const { setShowModal } = useContext(ModalContext)
  const { user, setUser } = useContext(UserContext)
  const { setAlert } = useContext(AlertContext)

  const [values, handleInputChange] = useForm({
    user: undefined,
    title: undefined,
  })


  const fileInputRef = useRef()


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

  const closeModal = (e, exitClick = true) => {

    e.preventDefault()
    document.getElementsByTagName("body")[0].style = ""

    if(exitClick){
      setShowModal(false)
      setModalImage({file: null, image: null})
    }
    else {
      setShowModal(false)
    } 

  }

  const clickChangeImage =  () => {
    fileInputRef.current.click()
  }

  //TODO: Hacerlo un hook
  const changeImage = async (e) => {

    const file = e.target.files[0]

    if(!file){
      return
    }

    const fr = new FileReader()

    fr.onload = () => setModalImage({file, image: fr.result})

    fr.readAsDataURL(file)

  }

  const update = async (e) => {

    e.preventDefault()

    const toastId = toast.loading('Guardando...')

    setDisable(true)

    let background = ""

    let image = ""

    if(!modalImage.file){ 
      image = user.image
    }
    else {
      image = await uploadImage(modalImage.file)
    }

    
    if(!image){
      return toast.error('Algo salio mal al subir la imagen, intente más tarde', {
        id: toastId,
      });
      
    }


    for (const item of Object.keys(selected)) {
    
      if(selected[item] && background === "" ){
        background = item
      }

    }
    
    const data = {
      user: values.user ?? user.user,
      title: values.title ?? user.title,
      background,
      image
    }

    const rawResponse = await fetch(`${config.APIURL}/profile/updateProfile/${router.query.id}`, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    

    const { ok, message, updatedUser } = await rawResponse.json()


    if(!ok){
      setAlert({error: true, success: false, message})
      return
    }

    toast.remove(toastId)
    setUser(updatedUser)
    setDisable(false)
    setAlert({success: true, error: false, message})

    closeModal(e, false)

  }

  useEffect(() => {

    setSelected({
      ...selected,
      [background]: true
    })

  
  }, [background])

  useEffect(() => {

    setModalImage({image})

  }, [image])


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

            <img className={styles.modalImage} src={modalImage.image ?? user.image} alt="Imagen de usuario"/>
            
            <button onClick={clickChangeImage} className={`${buttonStyles.form__button} ${buttonStyles.buttonBlueModal}`}>Cambiar</button>

            <input ref={fileInputRef} onChange={changeImage} type="file" accept="image/png, image/jpeg" style={{display: 'none'}} />
            
          </div>

          <form onSubmit={update} className={createStyles.form}>

            <AnimatedInput handleInputChange={handleInputChange} value={user.user} label="Nombre" name="user" type="text" />

            <AnimatedInput handleInputChange={handleInputChange} value={user.title} label="Titulo" name="title" type="text" />

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

            <button disabled={disable} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>
              { disabled ? "Guardando..." : "Guardar" }
            </button>

          </form>

        </div>
      }
      
    </>
  )
}
