import { ProfileInfo } from '../components/ProfileInfo'
import { UnansweredQuestion } from '../components/UnansweredQuestions'
import { AnsweredQuestions } from '../components/AnsweredQuestions'
import Head from 'next/head'



const profile = () => {

  return (

    <>

      <Head>
        <title>Mi perfil</title>
      </Head>
      
      <ProfileInfo />
      
      <UnansweredQuestion isLogged={true}/>
      
      <AnsweredQuestions /> 

    </>

  )

}

export default profile
