import Head from 'next/head'
import { ProfileInfo } from '../components/ProfileInfo'
import { UnansweredQuestion } from '../components/UnansweredQuestions'
import { AnsweredQuestions } from '../components/AnsweredQuestions'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import { AlertContext } from '../context/AlertContext'


const profile = () => {

  const { setIsLogged } = useContext(AuthContext)
  const { alert } = useContext(AlertContext)

  const router = useRouter()

  const isLogged = async () =>{

    const token = localStorage.getItem("token")

    const resp = await fetch("http://localhost:3000/api/tokenIsValid", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });


    const { ok } = await resp.json();

    if (!ok) return router.replace("/login")

    setIsLogged(true)

  }


  // Auth effects
  useEffect(() => {
    
    if(!localStorage.getItem("token")){

      return router.replace("/login")
      
    }

    isLogged()

  }, [])

  // Alert effects
  useEffect(() => {

    if(alert.success){
      toast.success(alert.message);
    }

  }, [])

  return (

    <>

      <Head>
        <title>Mi perfil</title>
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,  
        }}
      />
      
      <ProfileInfo />
      
      <UnansweredQuestion isLogged={true}/>
      
      <AnsweredQuestions /> 

    </>

  )

}

export default profile
