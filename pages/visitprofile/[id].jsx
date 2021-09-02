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
      "Authorization": context.req.cookies.token,
      "Content-Type": "application/json"
    }
  })

  const user = await rawUser.json()

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

      {/* <ProfileInfo showButton={false} /> */}

      <CreateQuestion  />

      {/* <AnsweredQuestions author={"Bastian"}/>

      <UnansweredQuestion /> */}

      { questions?.length == 0 && <NotQuestions /> }

    </>
    
  )

}

export default visitprofile
