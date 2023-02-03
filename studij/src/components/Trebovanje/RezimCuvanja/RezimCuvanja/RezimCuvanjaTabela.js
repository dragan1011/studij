import React, {useState} from 'react'

import RezimCuvanjaEdit from '../RezimCuvanjaEdit/RezimCuvanjaEdit'

import classes from './RezimCuvanjaTabela.module.css'
import { RezimCuvanjaRed } from './RezimCuvanjaRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
      {edit && <RezimCuvanjaEdit refresh={props.refresh} title="Izmjena režima čuvanja" data={modalData} closeModal={()=> setEdit(false)} />} 
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <RezimCuvanjaRed key={item.naziv} {...item} open={openModalHandler}></RezimCuvanjaRed>
         )} 
    </div>
  )
}
