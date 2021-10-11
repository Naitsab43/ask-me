import styles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { useForm } from '../hooks/useForm'
import { AlertContext } from '../context/AlertContext'
import { useContext } from 'react'
import { QuestionsContext } from '../context/QuestionsContext'

export const UnansweredQuestion = ({isLogged, question}) => {
  
  const [ values, handleInputChange ] = useForm({
    answer: ""
  })

  const { setAlert } = useContext(AlertContext)
  const { questions, setQuestions } = useContext(QuestionsContext)

  const { question: aQuestion } = question;


  const sendAnswer = async (e) => {

    e.preventDefault()

    const { ok, message, updatedQuestion } = await fetch(`http://localhost:3000/api/profile/sendAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({answer: values.answer, idQuestion: question._id})
    }).then(resp => resp.json())


    if(ok){

 
      setQuestions(questions => questions.map(question => {
        
        if(question._id === updatedQuestion._id) return updatedQuestion

        return question

      }))

 
      return setAlert({
        success: true,
        error: false,
        message
      })
    }

    setAlert({
      error: true,
      success: false,
      message
    })

  }

  return (

    <div className={styles["question-bg"]}>

      <span className={styles["question-bg__author"]}>Anonimo:</span>
      <p className={styles["question-bg__question"]}>{ aQuestion }</p>

      {

        isLogged ? 

          <form onSubmit={sendAnswer} className={createStyles.form} autoComplete="off">

            <input 
              className={`${inputStyles.form__input} ${inputStyles["form__input--answer"]}`} 
              onChange={handleInputChange}
              name="answer" 
              type="text" 
              placeholder="Ingrese una respuesta..." 
            />

            <button className={buttonStyles["button-answer"]}>Responder</button>

          </form>

          :

          <p className={styles["question__not-answer"]}>Bastian aún no a respondido esta pregunta</p>

        

      }
      
    </div>

  )
}
