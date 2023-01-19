import React from 'react'
import classes from './LijekoviTabela.module.css'


export const Lijekovi = props => {

  let key = 0;
  key++;

 const openModalHandler = () => {
    const tempData = {id: props.id, naziv: props.naziv, sifra: props.sifra, jm: props.jm, id_rezim: props.id_rezim, studij_id: props.studij_id, jedinica: props.jedinica, rezim: props.rezim}
    props.open(tempData);
 }


  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed}`} key={props.id} onClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.sifra}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{ Array.from(props.jedinica).map(data => {
         return <div key={Math.random()}>{Number(props.jm) === Number(data.id) ? data.naziv : ''}</div>
         })

         }</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{Array.from(props.rezim).map(data => {
         return <div key={Math.random()}>{Number(props.id_rezim) === Number(data.id) ? data.naziv : ''}</div>
         })}</div>
    </div>
  )
}
