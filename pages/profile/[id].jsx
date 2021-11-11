import { useContext, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

import { ProfileInfo } from '../../components/ProfileInfo'
import { NotQuestions } from '../../components/NotQuestions'
import { UnansweredQuestion } from '../../components/UnansweredQuestions'
import { AnsweredQuestions } from '../../components/AnsweredQuestions'

import { AuthContext } from '../../context/AuthContext'
import { AlertContext } from '../../context/AlertContext'
import { UserContext } from '../../context/UserContext'
import { QuestionsContext } from '../../context/QuestionsContext'
import config from '../../config'

export async function getServerSideProps(context) {

  const rawUser = await fetch(`${process.env.APIURL}/profile/${context.query.id}`, {
    method: "GET",
    headers: {
      "Authorization": context.req.cookies.token,
      "Content-Type": "application/json"
    }
  })

  const user = await rawUser.json()

  if(user.ok === false) {

    return {
      props: {
        user: [],
        token: null
      }
    }

  }

  user.questions = user.questions.sort((a) => {

    if(a.answer === null) return -1
    
    return 1

  })

  return {
    props: {
      token: context.req.cookies.token ?? null,
      user
    }, 
  }
  
  
}

const Profile = ({token, user: userProps}) => {

  const { isLogged, setIsLogged } = useContext(AuthContext)
  const { setUser } = useContext(UserContext)
  const { alert } = useContext(AlertContext)
  const { questions, setQuestions } = useContext(QuestionsContext)

  const router = useRouter()

  const verifyToken = async () =>{

    const resp = await fetch(`${config.APIURL}/tokenIsValid`, {
      method: "GET",
    });

    const { ok } = await resp.json();

    if (!ok) return router.replace("/login")

    setIsLogged(true)

  }

  // Auth effect
  useEffect(() => {

    if(!token){

      return router.replace("/login")
      
    }

    verifyToken()

  }, [router, token, verifyToken])

  // Alert effect
  useEffect(() => {

    if(alert.success){
      toast.success(alert.message);
    }

    if(alert.error){
      toast.error(alert.message)
    }

  }, [alert])

  // First fetching from server effect
  useEffect(() => {
    setQuestions(userProps.questions)
  }, [])

  useEffect(() => {
    setUser(userProps)
  }, [])


  return (

    <>

      <Head>
        <title>Mi perfil</title>
        <meta property="og:image" content={userProps.image} />
        <meta name="og:description" content={`Perfil de ${userProps.name}`} />
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,  
        }}
      />
      
      <ProfileInfo showButton token={token}/>

      
      { questions?.length == 0 && <NotQuestions /> }


      { 

        questions?.map((question) => (

          question.answer ? 

          <AnsweredQuestions key={question._id} question={question} /> 
          : 
          <UnansweredQuestion key={question._id} question={question} isLogged={isLogged}/>

        ))
        
      }

    </>

  )

}

export default Profile
