import React from 'react'

import classes from './TopMenuButton.module.css'

function MenuButton(props) {

  function handleClick(){
    props.select(props.name)
  }

  return (
    <div className={classes.container}>
    <button onClick={handleClick} className={`${classes.menuButton} ${props.activ === props.name ? classes.active : ''}`}>{props.children}</button>
    </div>
  )
}

export default MenuButton