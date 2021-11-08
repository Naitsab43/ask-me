import Layout from '../components/Layout'
import Head from "next/head"
import '../styles/globals.css'
import { AlertProvider } from '../context/AlertContext'
import { AuthProvider } from '../context/AuthContext'
import { QuestionsProvider } from '../context/QuestionsContext'
import { ModalProvider } from '../context/ModalContext'
import { UserProvider } from '../context/UserContext'

function MyApp({ Component, pageProps }) {
  return (

    <QuestionsProvider>

      <AuthProvider>

        <UserProvider>

          <AlertProvider>

            <ModalProvider>

              <Layout> 

                <Head>
                  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" rel="stylesheet" /> 
                  <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet" /> 
                  <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
                  <link rel="shortcut icon" href="img/qa-logo.ico" type="image/x-icon" />
                </Head>

                <Component {...pageProps} />
                
              </Layout>
            
            </ModalProvider>

          </AlertProvider>

        </UserProvider>

      </AuthProvider>

    </QuestionsProvider>

  )
}

export default MyApp
