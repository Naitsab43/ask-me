import styles from '../styles/profile.module.css'

export const AnsweredQuestions = () => {
  return (

    <div className={styles.bg}>

      <div className={styles.bg__question}>
        <p className={styles.bg__question__anom}>Anonimo:</p>
        <span className={styles.bg__question__span}><p className="bg__question__text">Pregunta</p></span>
      </div>

      <div className={styles.bg__answer}>
        <p className={styles.bg__answer__anom}>Yo:</p>
        <span className={styles.bg__answer__span}><p className="bg__answer__text">Respuesta</p></span>
      </div>

    </div>
  )
}
