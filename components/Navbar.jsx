import React, { useEffect } from 'react'
import { useNavColor } from '../hooks/useNavColor'
import styles from '../styles/navbar.module.css'


const Navbar = () => {

  const { navRef, titleNav, visible, changeNavColor } = useNavColor();

  useEffect(() => {

    visible && changeNavColor()
    
  }, [])


  return (
    
    <>  

      {

        visible && (
          <nav ref={navRef} className={styles.nav}>
            <span className={styles.nav__text}>{ titleNav }</span>
          </nav>
        )

      }

    </>

  )
}

export default Navbar
