import React from 'react'
import { AnsweredQuestions } from '../components/AnsweredQuestions'
import { CreateQuestion } from '../components/CreateQuestion'
import { NotQuestions } from '../components/NotQuestions'
import { ProfileInfo } from '../components/ProfileInfo'
import { UnansweredQuestion } from '../components/UnansweredQuestions'

const visitprofile = () => {

  return (

    <>

      <ProfileInfo showButton={false} />

      <CreateQuestion  />

      <AnsweredQuestions author={"Bastian"}/>

      <UnansweredQuestion />

      <NotQuestions />

    </>
    
  )

}

export default visitprofile
