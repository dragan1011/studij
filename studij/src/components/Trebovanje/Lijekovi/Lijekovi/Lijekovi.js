import React, { useState, useEffect } from 'react'
import LijekoviTabela from './LijekoviTabela';
import AddLijekModal from '../AddLijekModal/AddLijekModal';

import classes from './Lijekovi.module.css'

function Statusi(props) {
 
  const [searchTerm, setSearchTerm] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])
  const [jm, setJm] = useState([])
  const [rezim, setRezim] = useState([])

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
    // fetch jedinica mjere
    const jmFetch = async () => {
      const data = await (
        await fetch(
          "http://localhost:3001/jm"
        )
      ).json();

      // set state when the data received
      setJm(data);
    };
       // fetch rezim
       const rezimFetch = async () => {
        const data = await (
          await fetch(
            "http://localhost:3001/rezimCuvanja"
          )
        ).json();
  
        // set state when the data received
        setRezim(data);
      };

  

  useEffect(() => {
    dataFetch();
    jmFetch();
    rezimFetch();
  }, [refresh]);

  const refreshFunc = () => {

    setRefresh(prev => !prev) 
  
  }

  return (
   
 <div className={classes.dijeteWrapper}>
  <div className={classes.components}>
     <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
     <button onClick={modal} className={classes.add}>Dodaj novi lijek</button>
   { isModal && <AddLijekModal studijId={props.studijId} refresh={refreshFunc} closeModal={setIsModal} title="Dodaj novi lijek" />}
        </div> 
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.half}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.half}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.half}`}>Jedinica mjere</div>
    <div className={`${classes.heading} ${classes.half}`}>Režim čuvanja</div>
  </div>
     <LijekoviTabela jm={jm} rezim={rezim} studijId={props.studijId} refresh={refreshFunc} data={search(data)}  />
</div>
  );
}

export default Statusi