import React from 'react'
import classes from './KorisniciTabela.module.css'


export const KorisniciRed = props => {



 const openModalHandler = () => {
    const tempData = {id: props.id, ime: props.ime,prezime: props.prezime,jmbg: props.jmbg ,id_uloga: props.id_uloga, datum_od: props.datum_od, datum_do: props.datum_do}
    props.open(tempData);
 }

  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed} ${Number(props.aktivno) === Number(2) ? classes.red : ''}`} key={props.id}  onClick={openModalHandler} >
        <div className={`${classes.cell} ${classes.naziv}`}>{props.ime}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.prezime}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.jmbg}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>   {Array.from(props.uloga).map(item => {
          return Number(item.id) === Number(props.id_uloga) ? item.naziv : ''
        })}</div> 
        <div className={`${classes.cell} ${classes.naziv}`}>{props.datum_od}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.datum_do}</div>       
    </div>
  )
}
