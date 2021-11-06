import styles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'
import Head from 'next/head';

import toast, { Toaster } from 'react-hot-toast';
import { useForm } from '../hooks/useForm';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AlertContext } from '../context/AlertContext';


const Create = () => {

  const [values, handleInputChange] = useForm({
    user: "",
    password: "",
    title: "",
    background: "default",
    image: "https://res.cloudinary.com/dft4yirox/image/upload/v1636180312/QA%20Anonymous/ms9v13bcnse8y1epzeyz.png"
  });

  const [disabled, setDisable] = useState(false)

  const { setAlert } = useContext(AlertContext);

  const router = useRouter();

  const createUser = async (e) => {

    e.preventDefault()

    if(values.user == ""){
      return toast.error("Escriba un nombre valido");
    }

    if(values.password < 5){
      return toast.error("Escriba una contraseña de minimo 5 digitos");
    }

    if(values.title == ""){
      return toast.error("Escriba un titulo valido");
    }

    setDisable(true)

    const resp = await fetch("https://questions-and-answers-kohl.vercel.app/api/newUser", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    });
    
    const { ok, message } = await resp.json()

    if(ok){
      setAlert({success: true, message})
      return router.push("/login")
    }

    setDisable(false)

    return toast.error(message);

  }

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

        <div className={inputStyles["content-input"]}>

          <input onChange={handleInputChange} className={inputStyles.form__input} name="title" type="text" required/>

          <label className={inputStyles.label} >Titulo De Q&A</label>

        </div>

        <button disabled={disabled} onClick={e => createUser(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}> { disabled ? "Cargando..." : "Crear Q&A" } </button>

      </form>


    </>

  )

}

export default Create;
