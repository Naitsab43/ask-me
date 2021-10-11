import styles from '../styles/profile.module.css'


export const AnsweredQuestions = ({author = "Yo", question}) => {

  const { question: aQuestion, answer } = question;

  return (

    <div className={styles["question-bg"]}>

      <span className={styles["question-bg__author"]}>Anonimo:</span>
      <p className={styles["question-bg__question"]}>{ aQuestion }</p>


      <p className={styles["question-bg__author"]}>{author}:</p>
      <p className={styles["question-bg__answer"]}>{ answer }</p>

    </div>
  )
}
