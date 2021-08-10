import { useRef } from "react";

export const useNavColor = () => {

  const navRef = useRef();

  const changeNavColor = () => {
    
    let colors = [
      { color: "#a70404", shadow: "#680000" },
      { color: "#4148E6", shadow: "#222E99" },
      { color: "#48FD4F", shadow: "#1B962F" },
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

  return {
    navRef,
    changeNavColor
  }


}