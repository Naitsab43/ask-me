import styles from '../styles/visitprofile.module.css'


export const NotQuestions = () => {
  return (

    <div className={styles["not-questions"]}>

      <img className={styles["not-questions__image"]} src="../img/empty.svg" alt="Persona con una caja vacia" />

      <span className={styles["not-questions__text"]}>No hay preguntas para mostrar :(</span>

    </div>

  )
}
