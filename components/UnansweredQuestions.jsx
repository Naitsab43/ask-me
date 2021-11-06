import styles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { useForm } from '../hooks/useForm'
import { AlertContext } from '../context/AlertContext'
import { useContext } from 'react'
import { QuestionsContext } from '../context/QuestionsContext'
import { UserContext } from '../context/UserContext'

export const UnansweredQuestion = ({isLogged, question}) => {
  
  const [ values, handleInputChange ] = useForm({
    answer: ""
  })

  const { setAlert } = useContext(AlertContext)
  const { setQuestions } = useContext(QuestionsContext)
  const { user } = useContext(UserContext)

  const { question: aQuestion } = question;


  const sendAnswer = async (e) => {

    e.preventDefault()

    if(values.answer.length < 1){

      setAlert({
        error: true,
        success: false,
        message: "Debe escribir al menos un caracter"
      })

      return

    }

    const { ok, message, updatedQuestion } = await fetch(`https://questions-and-answers-kohl.vercel.app/api/profile/sendAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({answer: values.answer, idQuestion: question._id})
    }).then(resp => resp.json())


    if(ok){

 
      setQuestions(questions => {

        let updatedQuestions = questions.map(question => {
        
          if(question._id === updatedQuestion._id) return updatedQuestion
  
          return question
  
        })

        updatedQuestions = updatedQuestions.sort((a) => {

          if(a.answer === null) return -1
          
          return 1
      
        })


        return updatedQuestions

      })

 
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

          <p className={styles["question__not-answer"]}>{ user.user } aún no a respondido esta pregunta</p>

        

      }
      
    </div>

  )
}
