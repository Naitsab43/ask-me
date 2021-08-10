import styles from '../styles/create.module.css'
import inputStyles from '../styles/inputs.module.css'
import buttonStyles from '../styles/buttons.module.css'
import Head from 'next/head';
import { useForm } from '../hooks/useForm';


const create = () => {

  const [values, handleInputChange] = useForm({
    name: "",
    password: "",
    title: ""
  });

  const createUser = (e) => {

    e.preventDefault()

    if(values.name == ""){
      return console.log("Escriba un nombre valido");
    }
    else if(values.password < 5){
      return console.log("Escriba una contraseña de minimo 5 digitos")
    }
    else if(values.title == ""){
      return console.log("Escriba un titulo valido");
    }

    console.log("usuario creado");

  }

  return (

    <>
      <Head>
        <title>Crear un Q&A</title>
      </Head>

      <form className={styles.form} autoComplete="off" >

        <div className={inputStyles["content-input"]}>

          <input onChange={handleInputChange} className={inputStyles.form__input} name="name" type="text" required />

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
