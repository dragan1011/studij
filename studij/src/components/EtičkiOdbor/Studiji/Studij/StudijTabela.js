import React, {useState} from 'react'

import StudijEdit from '../StudijEdit/StudijEdit'
import Centri from '../Centri/Centri'
import classes from './StudijTabela.module.css'
import { StudijRed } from './StudijRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalDataCentri, setModalDataCentri] = useState([])
  const [centriModal, setCentriModal] = useState(false)


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }

  const centriModalHandler = (data) => {
    setModalDataCentri(data)
    setCentriModal(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
    {edit && <StudijEdit refresh={props.refresh} title="Izmjena studija" data={modalData} closeModal={()=> setEdit(false)} />}
    {centriModal && <Centri refresh={props.refresh} title="Studijski centri" data={modalDataCentri} closeModal={()=> setCentriModal(false)} />}
      {props.data.sort((a,b) => +a.broj > +b.broj ? 1 : -1).map(item =>
         <StudijRed sponzor={props.sponzor} status={props.status} key={item.id} openCentri={centriModalHandler} {...item} open={openModalHandler}></StudijRed>
         )} 
    </div>
  )
}
