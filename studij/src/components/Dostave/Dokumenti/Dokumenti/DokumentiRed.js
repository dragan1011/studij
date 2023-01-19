import React from 'react'
import classes from './DokumentiTabela.module.css'


export const Dokumenti = props => {

  let key = 0;
  key++;

 const openModalHandler = () => {
    const tempData = {id: props.id, naziv: props.naziv, sifra: props.sifra, jm: props.jm, id_rezim: props.id_rezim, studij_id: props.studij_id}
    props.open(tempData);
 }


  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed}`} key={props.id} onClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.sifra}</div>

    </div>
  )
}
