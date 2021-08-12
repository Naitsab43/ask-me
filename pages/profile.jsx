import { ProfileInfo } from '../components/ProfileInfo'
import { UnansweredQuestion } from '../components/UnansweredQuestions'
import { AnsweredQuestions } from '../components/AnsweredQuestions'
import { NotQuestions } from '../components/NotQuestions'

const profile = () => {

  return (

    <>
      
      <ProfileInfo />
      
      <UnansweredQuestion />
      
      <AnsweredQuestions />

      <NotQuestions />

    </>

  )

}

export default profile
