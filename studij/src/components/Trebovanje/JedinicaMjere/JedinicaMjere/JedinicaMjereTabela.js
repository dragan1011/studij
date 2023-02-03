import React, {useState} from 'react'

import JedinicaMjereEdit from '../JedinicaMjereEdit/JedinicaMjereEdit'

import classes from './JedinicaMjereTabela.module.css'
import { JedinicaMjereRed } from './JedinicaMjereRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
      {edit && <JedinicaMjereEdit refresh={props.refresh} title="Izmjena jedinice mjere" data={modalData} closeModal={()=> setEdit(false)} />} 
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <JedinicaMjereRed key={item.naziv} {...item} open={openModalHandler}></JedinicaMjereRed>
         )} 
    </div>
  )
}
