import styles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'

import Head from 'next/head';
import { useForm } from '../hooks/useForm';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '../context/AlertContext';
import toast, { Toaster } from 'react-hot-toast';


const login = () => {

  const [values, handleInputChange] = useForm({
    user: "",
    password: ""
  })

  const router = useRouter();

  const { alert } = useContext(AlertContext);

  const login = (e) => {

    e.preventDefault()

    if(values.name == ""){
      return toast.error("Escriba un nombre valido");
    }
    else if(values.password < 5){
      return toast.error("Escriba una contraseña de minimo 5 digitos")
    }

    router.replace("/profile")

  }

  useEffect(() => {

    if(alert.success){
      toast.success("Cuenta creada correctamente");
    }

  }, [])

  return (

    <>

      <Head>
        <title>Crear un Q&A</title>
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,  
        }}
      />

      <form className={styles.form} autoComplete="off" >

        <div className={inputStyles["content-input"]}>

          <input onChange={handleInputChange} className={inputStyles.form__input} name="name" type="text" required />

          <label className={inputStyles.label}>Nombre</label>

        </div>

        <div className={inputStyles["content-input"]}>

          <input onChange={handleInputChange} className={inputStyles.form__input} name="password" type="password" required/>

          <label className={inputStyles.label} >Contraseña</label>

        </div>


        <button onClick={e => login(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>Ingresar a mi Q&A</button>

      </form>
    
    </>
    
  )

}

export default login
