import React from 'react'

import './TabButton.css'

function MenuButton(props) {

  function handleClick(){
    props.select(props.name)
  }

  return (
    <button onClick={handleClick} className={`tabButton${props.activ === props.name ? " act" : ''}`}>{props.children}</button>
  )
}

export default MenuButton