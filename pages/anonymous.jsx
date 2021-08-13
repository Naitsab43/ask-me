import styles from '../styles/anonymous.module.css'
import createStyles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'

import Head from 'next/head'
import { useForm } from '../hooks/useForm'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast';

const anonymous = () => {

  const [values, handleInputChange] = useForm({
    idQA: "",
  })

  const router = useRouter();

  const enterAnonymous = (e) => {

    e.preventDefault()

    if(values.idQA == ""){
      return toast.error("Escriba un id valido");
    }

    router.push("/visitprofile")
    console.log("Ingresado")

  }

  return (

    <>

      <Head>
        <title>Ingresar como anonimo</title>
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,  
        }}
      />


      <div className={styles["my-info-anom"]}>

        <h2 className={styles["my-info__title-anom"]}>¿Que debo hacer?</h2>
        
        <span className={styles["my-info__text-anom"]}>Para poder ingresar y formular una pregunta a una persona debes obtener el ID del perfil (Q&A) de la persona. Para obtenerlo la persona debe concederte el ID de su perfil ingresarlo en el rectangulo blanco de abajo, esto te llevara al perfil y podras crear preguntas al propietario del perfil.</span>

      </div>
      
      <form className={createStyles.form} autoComplete="off">

        <div className={inputStyles["content-input"]}>

          <input onChange={handleInputChange} className={inputStyles.form__input} name="idQA" type="text" required/>

          <label className={inputStyles.label} >Id del perfil (Q&A)</label>

        </div>

        <button onClick={e => enterAnonymous(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>Ingresar ID</button>

      </form>
          
      
    </>

  )

}

export default anonymous
