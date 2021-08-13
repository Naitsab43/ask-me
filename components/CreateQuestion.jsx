import profileStyles from '../styles/profile.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'

export const CreateQuestion = () => {

  return (

    <div className={profileStyles["question-bg"]}>
  
      <form className={createStyles.form}>

        <input className={`${inputStyles.form__input} ${inputStyles["form__input--answer"]}`} name="question" type="text" placeholder="Ingrese una pregunta..." autoComplete="off" />

        <button className={buttonStyles["button-answer"]}>Enviar pregunta</button>

      </form>

    </div>

  )
}

