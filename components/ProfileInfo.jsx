import { useContext } from 'react'

import styles from '../styles/profile.module.css'
import buttonStyles from '../styles/buttons.module.css'

import { AlertContext } from '../context/AlertContext'
import { ModalContext } from '../context/ModalContext'
import { Modal } from './Modal'
import { profileBackground } from '../helpers/profileBackground'

export const ProfileInfo = ({user, title, image, background, _id, showButton=false }) => {

  const { setAlert } = useContext(AlertContext)
  const { showModal, setShowModal } = useContext(ModalContext)

  const data = {
    user,
    title,
    image,
    background
  }

  const profileBg = profileBackground(background, styles)


  const copyToClipboard = e => {

    e.preventDefault()
    
    const aux = document.createElement("input")
    aux.setAttribute("value", _id);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    setAlert({
      success: true,
      error: false,
      message: "Se ha copiado el ID"
    })

  }

  const editProfile = () => {
    document.getElementsByTagName("body")[0].style = "overflow: hidden;"
    setShowModal(true)
  }

  return (

    <>

      <Modal show={showModal} data={data} />

      <div className={`${styles.profile} ${profileBg}`}>

        <img className={styles.profileImage} src="https://www.wallpaperuse.com/wallp/54-548934_m.jpg" />

        <div className={styles.profileInfoContainer}>

          <div className={styles.infoGroup}>
            <h2 className={styles.profileTitle}>{ title }</h2>
            <span className={styles.profileUser}>{ user }</span>
          </div>
          
          {

            showButton && 

            <>

              <button 
                className={`${buttonStyles.form__button} ${buttonStyles["form__button--copy"]}`}
                onClick={copyToClipboard}
              >
                Copiar ID
              </button>

              
              <button 
                className={`${buttonStyles.form__button} ${buttonStyles["form__button--edit"]}`}
                onClick={editProfile}
              >
                Editar perfil
              </button>

            </>

          }

        </div>

      </div>

    </>

  )

}

