import { createContext, useState } from "react";

export const AlertContext = createContext();

const initialState = {
  isSuccess: false,
  isError: false
} 

export const AlertProvider = ({children}) => {

  const [alert, setAlert] = useState(initialState)

  return (

    <AlertContext.Provider value={{alert, setAlert}}>
      {children}
    </AlertContext.Provider>

  );

}