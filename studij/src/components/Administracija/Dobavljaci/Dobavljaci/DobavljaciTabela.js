import React, {useState} from 'react'

import DobavljaciEdit from './../DobavljaciEdit/DobavljaciEdit'

import classes from './DobavljaciTabela.module.css'
import { DobavljaciRed } from './DobavljaciRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
       {edit && <DobavljaciEdit refresh={props.refresh} title="Izmjena sponzora" data={modalData} closeModal={()=> setEdit(false)} />}
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <DobavljaciRed key={item.naziv} {...item} open={openModalHandler}></DobavljaciRed>
         )} 
    </div>
  )
}
