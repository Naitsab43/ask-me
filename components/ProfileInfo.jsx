import styles from '../styles/profile.module.css'
import buttonStyles from '../styles/buttons.module.css'

export const ProfileInfo = ({user, title, idQA, image}, showButton=true) => {


  return (

    <div className={styles.profile}>

      <img className={styles["profile__image"]} src="https://play-lh.googleusercontent.com/IlnBc1ca_20U3qacgXrkXM_opQK9gvTXryaPSCCPCanD_o_hPdgPQkhQ6-DcsfSZ9PU9=s360" />

      <div className={styles["profile-info-container"]}>

        <h2 className={styles.profile__title}>{title}</h2>
        <span className={styles.profile__user}>{user}</span>
        
        {
          showButton && <button className={`${buttonStyles.form__button} ${buttonStyles["form__button--copy"]}`}>Copiar ID</button>
        }

      </div>
      
    </div>

  )

}

