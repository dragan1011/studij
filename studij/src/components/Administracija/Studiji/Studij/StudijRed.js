import React, { useState, useEffect } from 'react'
import classes from '../Studij/StudijTabela.module.css'


export const StudijRed = props => {


 const openModalHandler = () => {
    const tempData = {id:props.id, broj: props.broj, datum_od: props.datum_od, datum_do: props.datum_do, opis: props.opis, id_sponzora:props.id_sponzora, id_statusa: props.id_statusa}
    props.open(tempData);
 }

 const openCentriModal = () => {
  const tempData = {id:props.id, broj: props.broj, datum_od: props.datum_od, datum_do: props.datum_do, opis: props.opis, id_sponzora:props.id_sponzora, id_statusa: props.id_statusa}
  props.openCentri(tempData)
}


  return (
    <div className={`${classes.row} ${props.id / 2 % 1 ? classes.drugiRed : classes.prviRed} ${Number(props.id_statusa) === Number(3) ? classes.red : ''} `} key={props.id} >
        <div key={Math.random()} className={`${classes.cell} ${classes.lokacija}`} onClick={openCentriModal} >{props.broj}</div>
        <div key={Math.random()}  className={`${classes.cell} ${classes.lokacija}`} onClick={openCentriModal} >{props.opis}</div>
        <div key={Math.random()}  className={`${classes.cell} ${classes.lokacija}`} onClick={openCentriModal} >{props.datum_od}</div>
         <div key={Math.random()}  className={`${classes.cell} ${classes.lokacija}`} onClick={openCentriModal} >{props.datum_do}</div>

         <div key={Math.random()}  className={`${classes.cell} ${classes.lokacija}`} onClick={openCentriModal} >{
        Array.from(props.sponzor).map(data => {
         return <div key={data.id}>{Number(props.id_sponzora) === Number(data.id) ? data.naziv : ''}</div>
         })

         }</div>
         <div key={Math.random()}  className={`${classes.cell} ${classes.lokacija}`} onClick={openCentriModal} >{
          Array.from(props.status).map(data => {
                  return <div key={data.id}>{Number(props.id_statusa) === Number(data.id) ? data.naziv : ''}</div>
         })}</div>
           <div key={Math.random()}  className={`${classes.cell} ${classes.lokacija} ${classes.izmjena}`} onClick={openModalHandler}>Izmjeni</div>
    </div>
  )
}
