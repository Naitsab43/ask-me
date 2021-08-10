import React, { useEffect } from 'react'
import { useNavColor } from '../hooks/useNavColor'
import styles from '../styles/navbar.module.css'


const Navbar = () => {

  const { navRef, titleNav, changeNavColor } = useNavColor();

  useEffect(() => {
    
    changeNavColor()

  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <span className={styles.nav__text}>{ titleNav }</span>
    </nav>
  )
}

export default Navbar
