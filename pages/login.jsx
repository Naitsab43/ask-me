import styles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'

import Head from 'next/head';
import { useForm } from '../hooks/useForm';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '../context/AlertContext';
import toast, { Toaster } from 'react-hot-toast';


const login = () => {

  const [values, handleInputChange] = useForm({
    user: "Bastian",
    password: "1234567"
  })

  const [disabled, setDisable] = useState(false)

  const { setAlert } = useContext(AlertContext);

  const router = useRouter();


  const loginUser = async (e) => {

    e.preventDefault()


    if(values.user == ""){
      return toast.error("Escriba un nombre valido");
    }
    else if(values.password < 5){
      return toast.error("Escriba una contraseña de minimo 5 digitos")
    }

    setDisable(true)

    const resp = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    });
    
    const { ok, message, uid } = await resp.json()

    if(ok){

      setAlert({success: true, message})

      return router.replace({
        pathname: "/profile/[id]",
        query: {id: uid}
      })
    }

    setDisable(false)

    return toast.error(message);

  }

  useEffect(() => {

    if(alert.success){
      toast.success(alert.message);
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

          <input onChange={handleInputChange} className={inputStyles.form__input} name="user" type="text" required />

          <label className={inputStyles.label}>Nombre</label>

        </div>

        <div className={inputStyles["content-input"]}>

          <input onChange={handleInputChange} className={inputStyles.form__input} name="password" type="password" required/>

          <label className={inputStyles.label} >Contraseña</label>

        </div>


        <button disabled={disabled} onClick={e => loginUser(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}> { disabled ? "Cargando..." : "Ingresar a mi Q&A" } </button>

      </form>
    
    </>
    
  )

}

export default login
