import React, { useState, useEffect } from 'react'
import DokumentiTabela from './DokumentiTabela';
import AddDokumentModal from '../AddDokumentModal/AddDokumentModal';

import classes from './Dokumenti.module.css'

function Statusi(props) {
 
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
      item.naziv.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) 
  }

  
    // fetch lijekovi
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "http://localhost:3001/lijekovi"
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
     <button onClick={modal} className={classes.add}>Dodaj novi dokument</button>
   { isModal && <AddDokumentModal studijId={props.studijId} refresh={refreshFunc} closeModal={setIsModal} title="Dodaj novi dokument" />}
        </div> 
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.half}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.half}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.half}`}>Jedinica mjere</div>
    <div className={`${classes.heading} ${classes.half}`}>Režim čuvanja</div>
  </div>
     <DokumentiTabela studijId={props.studijId} refresh={refreshFunc} data={search(data)}  />
</div>
  );
}

export default Statusi