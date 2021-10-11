import { createContext, useState } from "react";

export const AlertContext = createContext();

const initialState = {
  success: false,
  error: false,
  message: ""
} 

export const AlertProvider = ({children}) => {

  const [alert, setAlert] = useState(initialState)

  return (

    <AlertContext.Provider value={{alert, setAlert}}>
      {children}
    </AlertContext.Provider>

  );

}