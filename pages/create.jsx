import styles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from '../hooks/useForm';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';


const create = () => {

  const [values, handleInputChange] = useForm({
    user: "",
    password: "",
    title: ""
  });

  const { setAlert } = useContext(AlertContext);

  const router = useRouter();

  const createUser = async (e) => {

    e.preventDefault()

    if(values.user == ""){
      return toast.error("Escriba un nombre valido");
    }
    else if(values.password < 5){
      return toast.error("Escriba una contraseña de minimo 5 digitos");
    }
    else if(values.title == ""){
      return toast.error("Escriba un titulo valido");
    }

    setAlert({success: true})

    router.replace("/login");

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

        <button onClick={e => createUser(e)} className={`${buttonStyles.form__button} ${buttonStyles["form__button--create"]}`}>Crear Q&A</button>

      </form>


    </>

  )

}

export default create;
