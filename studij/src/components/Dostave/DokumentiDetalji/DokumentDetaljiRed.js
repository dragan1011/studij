import React from 'react'
import classes from './DokumentDetaljiTabela.module.css'


export const DokumentDetaljiRed = props => {
  let key = 0;
  key++;


 const openModalHandler = () => {
    const tempData = {id: props.id, jedinstveni_kod_lijeka: props.jedinstveni_kod_lijeka, rok_trajanja: props.rok_trajanja, serija: props.serija, sifra_pacijenta: props.sifra_pacijenta}
    props.open(tempData);
 }


 console.log(props)
 const showUsers = () => {
  props.centarId(props.id)
 }
  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed}`} key={props.sifra} onDoubleClick={openModalHandler}  onClick={showUsers} >
        <div className={`${classes.cell} ${classes.naziv}`}>{props.id_lijeka}</div>
         <div className={`${classes.cell} ${classes.naziv}`}>{props.rok_trajanja}</div>
           <div className={`${classes.cell} ${classes.naziv}`}>{props.serija}</div>
            <div className={`${classes.cell} ${classes.naziv}`}>{props.jedinstveni_kod_lijeka}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.sifra_pacijenta}</div>
       
    </div>
  )
}
