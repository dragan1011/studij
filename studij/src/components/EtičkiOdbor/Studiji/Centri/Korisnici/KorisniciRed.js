import React from 'react'
import classes from './KorisniciTabela.module.css'


export const KorisniciRed = props => {



 const openModalHandler = () => {
    const tempData = {id: props.id, imePrezime: props.imePrezime,id_studijskog_centra: props.id_studijskog_centra ,id_uloga: props.id_uloga, datum_od: props.datum_od, datum_do: props.datum_do, aktivno: props.aktivno}
    props.open(tempData);
 }
  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed} ${Number(props.aktivno) === Number(2) ? classes.red : ''}`} key={props.id}  onClick={openModalHandler} >
        <div className={`${classes.cell} ${classes.naziv}`}>{props.imePrezime}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.centri.map(item => {
          return Number(item.id) === Number(props.id_studijskog_centra) ? item.naziv : ''
        })}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.uloga.map(item => {
          return Number(item.id) === Number(props.id_uloga) ? item.naziv : ''
        })}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.datum_od}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.datum_do}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{Number(props.aktivno) === Number(1) ? 'Aktivan' : 'Neaktivan'}</div>
       
    </div>
  )
}
