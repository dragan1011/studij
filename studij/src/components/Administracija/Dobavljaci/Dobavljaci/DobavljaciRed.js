import React from 'react'
import classes from '../Dobavljaci/DobavljaciTabela.module.css'


export const DobavljaciRed = props => {

  let key = 0;
  key++;

 const openModalHandler = () => {
    const tempData = {id: props.id ,naziv: props.naziv, adresa: props.adresa, drzava: props.drzava, jib: props.jib, telefon: props.telefon, napomena:props.napomena}
    props.open(tempData);
 }

  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed}`} key={props.id} onClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.adresa}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.drzava}</div>
         <div className={`${classes.cell} ${classes.lokacija}`}>{props.jib}</div>
         <div className={`${classes.cell} ${classes.lokacija}`}>{props.telefon}</div>
         <div className={`${classes.cell} ${classes.lokacija}`}>{props.napomena}</div>
  
       
    </div>
  )
}
