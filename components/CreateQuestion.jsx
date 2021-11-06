import profileStyles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'
import { useForm } from '../hooks/useForm'
import { useContext } from 'react'
import { AlertContext } from '../context/AlertContext'
import { useRouter } from 'next/router'
import { QuestionsContext } from '../context/QuestionsContext'

export const CreateQuestion = () => {

  const [ values, handleInputChange ] =  useForm({
    question: ""
  })

  const router = useRouter()

  const { setAlert } = useContext(AlertContext)
  const { setQuestions } = useContext(QuestionsContext)

  const sendQuestion = async (e) => {

    e.preventDefault()

    if(values.question.length < 1){  
      setAlert({error: true, success: false, message: "Debe escribir al menos un caracter"})
    }

    const rawResponse = await fetch(`https://questions-and-answers-naitsab.vercel.app/api/newQuestion/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idUser: router.query.id,
        question: values.question
      })
    })

    const { ok, message, questions } = await rawResponse.json()

    if(!ok){
      return setAlert({error: true, success: false, message})
    }

    setQuestions(questions)
    setAlert({error: false, success: true, message})

  } 

  return (

    <div className={profileStyles["question-bg"]}>
  
      <form className={createStyles.form} onSubmit={sendQuestion}>

        <input onChange={handleInputChange} className={`${inputStyles.form__input} ${inputStyles["form__input--answer"]}`} name="question" type="text" placeholder="Ingrese una pregunta..." autoComplete="off" />

        <button className={buttonStyles["button-answer"]}>Enviar pregunta</button>

      </form>

    </div>

  )
}

