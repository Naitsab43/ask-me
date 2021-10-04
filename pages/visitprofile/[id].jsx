import React from 'react'
import { AnsweredQuestions } from '../../components/AnsweredQuestions'
import { CreateQuestion } from '../../components/CreateQuestion'
import { NotQuestions } from '../../components/NotQuestions'
import { ProfileInfo } from '../../components/ProfileInfo'
import { UnansweredQuestion } from '../../components/UnansweredQuestions'

export async function getServerSideProps(context) {

  const rawUser = await fetch(`http://localhost:3000/api/visitprofile/${context.query.id}`, {
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

const visitprofile = ({user}) => {

  const { questions } = user


  return (

    <>

      <ProfileInfo {...user} />

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

export default visitprofile
