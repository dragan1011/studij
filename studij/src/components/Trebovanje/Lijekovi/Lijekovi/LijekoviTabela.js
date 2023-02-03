import React, {useState} from 'react'

import LijekEdit from '../LijekEdit/LijekEdit'

import classes from './LijekoviTabela.module.css'
import { Lijekovi } from './LijekoviRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }


  return (
    <div className={classes.dijeteWrapper}>
      {edit && <LijekEdit refresh={props.refresh} title="Izmjena lijeka" data={modalData} closeModal={()=> setEdit(false)} />} 
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
       Number(props.studijId) === Number(item.studij_id) ?
         <Lijekovi jedinica={props.jm} rezim={props.rezim} key={item.naziv} {...item} open={openModalHandler}></Lijekovi> : ''
         )} 
    </div>
  )
}
