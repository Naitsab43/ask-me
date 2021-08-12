import styles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'

export const UnansweredQuestion = () => {
  
  return (
    <div className={styles.bg}>

      <div className={styles.bg__question}>
        <p className={styles.bg__question__anom}>Anonimo:</p>
        <span className={styles.bg__question__span}><p class="bg__question__text">Pregunta</p></span>
      </div>
  
    
      <form className={createStyles.form}>
        <input className="form__input form__input--answer" name="answer" type="text" placeholder="Ingrese una respuesta..." autoComplete="off" />
        <button className="button-answer form__button--blue">Responder</button>
      </form>
      
    </div>
  )
}
