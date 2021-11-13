import { useContext } from 'react'

import styles from '../styles/profile.module.css'
import buttonStyles from '../styles/buttons.module.css'

import { AlertContext } from '../context/AlertContext'
import { ModalContext } from '../context/ModalContext'
import { Modal } from './Modal'
import { profileBackground } from '../helpers/profileBackground'
import { UserContext } from '../context/UserContext'

export const ProfileInfo = ({showButton=false, token }) => {

  const { setAlert } = useContext(AlertContext)
  const { user } = useContext(UserContext)
  const { showModal, setShowModal } = useContext(ModalContext)


  const profileBg = profileBackground(user.background, styles)


  const copyToClipboard = e => {

    e.preventDefault()
    
    const aux = document.createElement("input")
    aux.setAttribute("value", `https://ask-me.social/visitprofile/${user._id}`);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    setAlert({
      success: true,
      error: false,
      message: "Se ha copiado el link de perfil"
    })

  }


  const editProfile = () => {
    document.getElementsByTagName("body")[0].style = "overflow: hidden;"
    setShowModal(true)
  }


  return (

    <>

      <Modal show={showModal} background={user.background} image={user.image} token={token}/>

      <div className={`${styles.profile} ${profileBg}`}>

        <img className={styles.profileImage} src={user.image} alt="Imagen de usuario" />

        <div className={styles.profileInfoContainer}>

          <div className={styles.infoGroup}>
            <h2 className={styles.profileTitle}>{ user.title }</h2>
            <span className={styles.profileUser}>{ user.user }</span>
          </div>
          
          {

            showButton && 

            <>

              <button 
                className={`${buttonStyles.form__button} ${buttonStyles["form__button--copy"]}`}
                onClick={copyToClipboard}
              >
                Copiar link de mi perfil
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

