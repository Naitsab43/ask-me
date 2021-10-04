import Head from 'next/head'
import { ProfileInfo } from '../../components/ProfileInfo'
import { UnansweredQuestion } from '../../components/UnansweredQuestions'
import { AnsweredQuestions } from '../../components/AnsweredQuestions'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import { AlertContext } from '../../context/AlertContext'
import { NotQuestions } from '../../components/NotQuestions'
import { QuestionsContext } from '../../context/QuestionsContext'

export async function getServerSideProps(context) {

  const rawUser = await fetch(`http://localhost:3000/api/profile/${context.query.id}`, {
    method: "GET",
    headers: {
      "Authorization": context.req.cookies.token,
      "Content-Type": "application/json"
    }
  })

  const user = await rawUser.json()

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

const profile = ({token, user}) => {

  const { isLogged, setIsLogged } = useContext(AuthContext)
  const { alert } = useContext(AlertContext)
  const { questions, setQuestions } = useContext(QuestionsContext)


  const router = useRouter()

  const verifyToken = async () =>{

    const resp = await fetch("http://localhost:3000/api/tokenIsValid", {
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

  }, [])

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
    setQuestions(user.questions)
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
      
      <ProfileInfo showButton {...user}/>

      
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

export default profile
