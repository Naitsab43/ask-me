import styles from '../styles/profile.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { AlertContext } from '../context/AlertContext'
import { useContext } from 'react'

export const ProfileInfo = ({user, title, image, _id, showButton=false }) => {

  const { alert, setAlert } = useContext(AlertContext)

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

  return (

    <div className={styles.profile}>

      <img className={styles.profileImage} src="https://play-lh.googleusercontent.com/IlnBc1ca_20U3qacgXrkXM_opQK9gvTXryaPSCCPCanD_o_hPdgPQkhQ6-DcsfSZ9PU9=s360" />

      <div className={styles["profile-info-container"]}>

        <div className={styles.profileInfoGroup}>

          <h2 className={styles.profile__title}>{ title }</h2>
          <span className={styles.profile__user}>{ user }</span>

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
              onClick={copyToClipboard}
            >
              Editar perfil
            </button>

          </>

        }

      </div>
      
    </div>

  )

}

