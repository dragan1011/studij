import React from 'react'
import classes from './CentriTabela.module.css'


export const CentriRed = props => {

  let key = 0;
  key++;


 const openModalHandler = () => {
    const tempData = {id: props.id, naziv: props.naziv, sifra: props.sifra, id_studija: props.id_studija}
    props.open(tempData);
    props.centar()
 }

 const showUsers = () => {
  props.centarId(props.id)
 } 

  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed}`} key={props.sifra} onDoubleClick={openModalHandler}  onClick={showUsers}  >
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.sifra}</div>
       
    </div>
  )
}
