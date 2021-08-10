import React, { useRef, useEffect } from 'react'
import { useNavColor } from '../hooks/useNavColor'
import styles from '../styles/navbar.module.css'


const Navbar = () => {

  const { navRef, changeNavColor } = useNavColor();

  useEffect(() => {
    
    changeNavColor()

  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <span className={styles.nav__text}>Q & A</span>
    </nav>
  )
}

export default Navbar
