import React, {useState} from 'react'

import StatusiEdit from './../StatusiEdit/StatusiEdit'

import classes from './StatusiTabela.module.css'
import { StatusiRed } from './StatusiRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
       {edit && <StatusiEdit refresh={props.refresh} title="Izmjena statusa" data={modalData} closeModal={()=> setEdit(false)} />}
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <StatusiRed key={item.naziv} {...item} open={openModalHandler}></StatusiRed>
         )} 
    </div>
  )
}
