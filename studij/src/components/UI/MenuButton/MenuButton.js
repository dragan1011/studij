import React from 'react'

import classes from './MenuButton.module.css'

function MenuButton(props) {

  function handleClick(){
    props.select(props.name)
  }

  return (
    <button onClick={handleClick} className={`${classes.menuButton} ${props.activ === props.name ? classes.active : ''}`}>{props.children}</button>
  )
}

export default MenuButton