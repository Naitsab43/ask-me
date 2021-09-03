import { useRef } from "react";
import { useRouter } from "next/router";

export const useNavColor = () => {

  const navRef = useRef();

  const changeNavColor = () => {
    
    let colors = [
      { color: "#a70404", shadow: "#680000" },
      { color: "#4148E6", shadow: "#222E99" },
      { color: "#82cc5e", shadow: "#5b8f41" },
      { color: "#DA6946", shadow: "#8E442C" },
      { color: "#A01CAB", shadow: "#71238C" },
      { color: "#19AD78", shadow: "#1C7253" },
      { color: "#D3B034", shadow: "#A48A2F" },
      { color: "#E34C67", shadow: "#B84358" }
    ]

    let number = Math.floor(Math.random() * 7);

    navRef.current.style.backgroundColor = colors[number].color;
    navRef.current.style.borderBottom = `${colors[number].shadow} 5px solid`;
  }

  let titleNav = "";
  let visible = true;

  const { pathname } = useRouter()


  switch(pathname){

    case "/":
      titleNav = "Q&A"
      break;

    case "/create":
      titleNav = "Crear un Q&A"
      break;
  
    case "/login":
      titleNav = "Ingresar a mi Q&A"
      break;

    case "/anonymous":
      titleNav = "Ingresar como anónimo"
      break;

    case "/profile/[id]":
      titleNav = "Mi Perfil"
      break;

    case "/visitprofile/[id]":
      titleNav = "Visitando un perfil (Q&A)"
      break;

    default: 
      visible = false;
      break;

  }

  return {
    navRef,
    titleNav,
    visible,
    changeNavColor,
  }


}