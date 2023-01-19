import React from 'react'
import classes from './JedinicaMjereTabela.module.css'


export const JedinicaMjereRed = props => {

  let key = 0;
  key++;

 const openModalHandler = () => {
    const tempData = {id: props.id, naziv: props.naziv, opis: props.opis}
    props.open(tempData);
 }

  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed}`} key={props.id} onClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.opis}</div>
    </div>
  )
}
