import React from 'react'
import classes from './DostavaKartica.module.css'


export const StatusiRed = props => {

  let key = 0;
  key++;

 const openModalHandler = () => {
    const tempData = {id: props.id, broj: props.broj, opis: props.opis, id_statusa: props.id_statusa}
    props.open(tempData);
 }

 const useId = () => {
  props.studijId(props.id)
 }

  return (
    Number(props.id_statusa) === Number('1') ?
    <div className={classes.studijWrapper} key={props.id} onDoubleClick={openModalHandler}  onClick={useId}>
        <div className={`${classes.cell} ${classes.brojStudija}`}>{props.broj}</div>
        <div className={`${classes.cell} ${classes.opisStudija}`}>{props.opis}</div>
    </div>
    : ''
  )
}
