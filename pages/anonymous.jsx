import styles from '../styles/anonymous.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'

import Head from 'next/head'
import { useForm } from '../hooks/useForm'

const anonymous = () => {

  const [values, handleInputChange] = useForm({
    idQA: "",
  })

  const enterAnonymous = (e) => {

    e.preventDefault()

    if(values.idQA == ""){
      return console.log("Escriba un nombre valido");
    }

    console.log("Ingresado")

  }

  return (

    <>

      <Head>
        <title>Ingresar como anonimo</title>
      </Head>

      <div className={styles["union-info-input_button"]}>

        <div className={styles["my-info-anom"]}>

          <h2 className={styles["my-info__title-anom"]}>¿Que debo hacer?</h2>
          
          <span className={styles["my-info__text-anom"]}>Para poder ingresar y formular una pregunta a una persona debes obtener el ID del Q&A de la persona. Para obtenerlo la persona debe concederte el ID de su Q&A e ingresarlo en el rectangulo blanco de abajo, esto te llevara al Q&A y podras crear una pregunta para el propietario.</span>

        </div>
        
        <form className={createStyles.form}>

          <div className={inputStyles["content-input"]}>

            <input onChange={handleInputChange} className={inputStyles.form__input} name="idQA" type="text" required/>

            <label className={inputStyles.label} >Id del Q&A</label>

          </div>

          <button onClick={e => enterAnonymous(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>Ingresar ID</button>

        </form>
          
        
      </div>

    </>

  )

}

export default anonymous
