import styles from '../styles/profile.module.css'


export const AnsweredQuestions = ({author = "Yo"}) => {
  return (

    <div className={styles["question-bg"]}>

      <span className={styles["question-bg__author"]}>Anonimo:</span>
      <p className={styles["question-bg__question"]}>Aqui va la pregunta</p>


      <p className={styles["question-bg__author"]}>{author}:</p>
      <p className={styles["question-bg__answer"]}>Respuesta</p>

    </div>
  )
}
