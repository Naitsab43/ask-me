import React from 'react'
import styles from '../styles/modal.module.css'

export const Selected = ({visible=false}) => {
  return (
    
    visible && (

      <div className={styles.selected}>

        <div>
          <p>Seleccionado</p>
        </div>

     </div>

    )

  )
}
