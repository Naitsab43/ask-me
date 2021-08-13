import Layout from '../components/Layout'
import Head from "next/head"
import '../styles/globals.css'
import { AlertProvider } from '../context/AlertContext'

function MyApp({ Component, pageProps }) {
  return (
    
    <AlertProvider>

      <Layout> 

        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet" /> 
          <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
        </Head>

        <Component {...pageProps} />
      </Layout>

    </AlertProvider>

  )
}

export default MyApp
