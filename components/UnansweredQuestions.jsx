import styles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'

export const UnansweredQuestion = ({isLogged, question}) => {
  
  const { question: aQuestion } = question;

  return (

    <div className={styles["question-bg"]}>

      <span className={styles["question-bg__author"]}>Anonimo:</span>
      <p className={styles["question-bg__question"]}>{ aQuestion }</p>

      {

        isLogged ? 

          <form className={createStyles.form} autoComplete="off">

            <input className={`${inputStyles.form__input} ${inputStyles["form__input--answer"]}`} name="answer" type="text" placeholder="Ingrese una respuesta..." />

            <button className={buttonStyles["button-answer"]}>Responder</button>

          </form>

          :

          <p className={styles["question__not-answer"]}>Bastian aún no a respondido esta pregunta</p>

        

      }
      
    </div>

  )
}
