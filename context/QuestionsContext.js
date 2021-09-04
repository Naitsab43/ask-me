import { createContext, useEffect, useState } from "react";

export const QuestionsContext = createContext();


export const QuestionsProvider = ({children}) => {

  const [questions, setQuestions] = useState([])


  useEffect(() => {
    /* Solo para que se redibuje cuando haya una respuesta */
  }, [questions])

  return (

    <QuestionsContext.Provider value={{questions, setQuestions}}>
      {children}
    </QuestionsContext.Provider>

  );

}