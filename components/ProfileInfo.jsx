import styles from '../styles/profile.module.css'
import buttonStyles from '../styles/buttons.module.css'

export const ProfileInfo = () => {

  return (

    <div className={styles["my-info"]}>
        
      <h2 className={styles["my-info__title"]}>Mi perfil</h2>
      <span className={styles["my-info__text"]}>Bastian</span>
      
      <button className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>Copiar ID</button>
      
    </div>

  )

}

