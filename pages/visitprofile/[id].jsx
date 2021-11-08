import React, { useContext, useEffect } from 'react'
import { AnsweredQuestions } from '../../components/AnsweredQuestions'
import { CreateQuestion } from '../../components/CreateQuestion'
import { NotQuestions } from '../../components/NotQuestions'
import { ProfileInfo } from '../../components/ProfileInfo'
import { UnansweredQuestion } from '../../components/UnansweredQuestions'
import { UserContext } from '../../context/UserContext'
import { QuestionsContext } from '../../context/QuestionsContext'
import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'
import { AlertContext } from '../../context/AlertContext'

export async function getServerSideProps(context) {

  const rawUser = await fetch(`${process.env.APIURL}/visitprofile/${context.query.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const { user } = await rawUser.json()

  user.questions = user.questions.sort((a) => {

    if(a.answer === null) return 1
    
    return -1

  })

  return {
    props: {
      user
    }, 
  }
  
}

const VisitProfile = ({user: userProps}) => {

  const { setUser } = useContext(UserContext)
  const { questions, setQuestions } = useContext(QuestionsContext)
  const { alert } = useContext(AlertContext)

  useEffect(() => {
    setQuestions(userProps.questions)
  }, [])

  useEffect(() => {
    setUser(userProps)
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


  return (

    <>

    
      <Head>
        <title>Visitar Perfil</title>
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,  
        }}
      />

      <ProfileInfo />

      <CreateQuestion />

      { questions?.length == 0 && <NotQuestions /> }

      { 

        questions?.map((question) => (
          
          question.answer ? 

          <AnsweredQuestions key={question._id} question={question} /> 
          : 
          <UnansweredQuestion key={question._id} question={question} isLogged={false}/>

        ))

      }

    </>
    
  )

}

export default VisitProfile
