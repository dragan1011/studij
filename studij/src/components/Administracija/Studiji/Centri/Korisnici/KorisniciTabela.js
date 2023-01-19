import React, {useState} from 'react'

import KorisniciEdit from './KorisniciEdit'

import classes from './KorisniciTabela.module.css'
import { KorisniciRed } from './KorisniciRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  } 


  return (
    <div className={classes.dijeteWrapper}>
        {edit && <KorisniciEdit uloga={props.uloga} refresh={props.refresh} title="Izmjena korisnika" data={modalData} closeModal={()=> setEdit(false)} />}
       {Array.from(props.data).sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
             
        
             Number(props.centarId) === Number(item.id_studijskog_centra) ?
             <KorisniciRed centri={props.centri} uloga={props.uloga} key={Math.random()} {...item} open={openModalHandler}></KorisniciRed>
            : ''
        
     
         )} 
    </div>
  )
}
