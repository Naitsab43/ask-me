import { useContext } from 'react'

import styles from '../styles/profile.module.css'
import buttonStyles from '../styles/buttons.module.css'

import { AlertContext } from '../context/AlertContext'
import { ModalContext } from '../context/ModalContext'
import { Modal } from './Modal'

export const ProfileInfo = ({user, title, image, _id, showButton=false }) => {

  const { alert, setAlert } = useContext(AlertContext)
  const { showModal, setShowModal } = useContext(ModalContext)


  const copyToClipboard = e => {

    e.preventDefault()
    
    const aux = document.createElement("input")
    aux.setAttribute("value", _id);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    setAlert({
      ...alert,
      success: true,
      message: "Se ha copiado el ID"
    })

  }

  const editProfile = () => {
    setShowModal(true)
  }

  return (

    <>

      <Modal show={showModal} />

      <div className={styles.profile}>

        <img className={styles.profileImage} src="https://play-lh.googleusercontent.com/IlnBc1ca_20U3qacgXrkXM_opQK9gvTXryaPSCCPCanD_o_hPdgPQkhQ6-DcsfSZ9PU9=s360" />

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

