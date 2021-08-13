import buttonStyles from '../styles/buttons.module.css'
import styles from '../styles/home.module.css'
import Head from "next/head"
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();

  const handleClickButton = (e, path) => {

    e.preventDefault();

    router.push(path);

  }

  return (

    <>

      <Head>
        <title>Home</title>
      </Head>

      <div className={styles["union-info-buttons"]}>

        <section className={styles.info}>
          <h2 className={`${styles.info__title} animate__animated animate__fadeIn`}>¿Que es esto?</h2>
          <p className={`${styles.info__text} animate__animated animate__fadeIn`}>Esta es una aplicacion de preguntas y respuestas (Q&A) anonimas. Crea un perfil para crear un Q&A o visita un perfil para hacer preguntas.</p>
        </section>


        <div className={styles["content-buttons"]}>

          <button 
            className={`${buttonStyles.form__button} ${buttonStyles["form__button--green"]} animate__animated animate__slideInLeft`}
            onClick={(e) => handleClickButton(e, "/create")}
          > 
            Crear un Q&A 
          </button>

          <button 
            className={`${buttonStyles.form__button} ${buttonStyles["form__button--blue"]} animate__animated animate__slideInLeft`}
            onClick={(e) => handleClickButton(e, "/login")}
          > 
            Ingresar a mi Q&A
          </button>

          <button 
            className={`${buttonStyles.form__button} ${buttonStyles["form__button--orange"]} animate__animated animate__slideInLeft`}
            onClick={(e) => handleClickButton(e, "/anonymous")}
          > 
            Visitar un perfil
          </button>


        </div>

      </div>

    </>

  )
}
