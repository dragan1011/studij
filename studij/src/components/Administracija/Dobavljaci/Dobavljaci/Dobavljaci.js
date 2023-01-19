import React, { useState, useEffect } from 'react'
import DobavljaciTabela from './DobavljaciTabela';
import AddStatusModal from '../AddStatusModal/AddStatusModal';

import classes from './Dobavljaci.module.css'

function Statusi() {
 
  const [searchTerm, setSearchTerm] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])

  const [refresh, setRefresh] = useState(false)

  const modal = () => {
    setIsModal(true)
    document.body.style.overflow = 'hidden'
   }

  const search = (data) => {

     return data.filter(
      (item)=> 
      item.naziv.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adresa.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.drzava.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jib.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.telefon.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.napomena.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) 
  }

// fetch data
const dataFetch = async () => {
  const data = await (
    await fetch(
      "http://localhost:3001/sponzor"
    )
  ).json();

  // set state when the data received
  setData(data);
};



useEffect(() => {
dataFetch();
}, [refresh]);

const refreshFunc = () => {

setRefresh(prev => !prev) 

}
  return (
   
 <div className={classes.dijeteWrapper}>
  <div className={classes.components}>
     <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
     <button onClick={modal} className={classes.add}>Dodaj novog sponzora</button>
   { isModal && <AddStatusModal refresh={refreshFunc} closeModal={setIsModal} title="Dodaj novog sponzora" />}
        </div> 
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.half}`}>Ime</div>
    <div className={`${classes.heading} ${classes.half}`}>Adresa</div>
    <div className={`${classes.heading} ${classes.half}`}>Država</div>
    <div className={`${classes.heading} ${classes.half}`}>JIB</div>
    <div className={`${classes.heading} ${classes.half}`}>Telefon</div>
    <div className={`${classes.heading} ${classes.half}`}>Napomena</div>
  </div>
     <DobavljaciTabela refresh={refreshFunc} data={search(data)}  />

</div>
  );
}

export default Statusi