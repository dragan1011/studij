import React, { useState, useEffect } from 'react'
import KorisniciTabela from './KorisniciTabela';
import AddKorisniciModal from './AddKorisniciModal/AddKorisniciModal'


import classes from './Korisnici.module.css'

function Statusi() {
 
  const [searchTerm, setSearchTerm] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])
  const [uloga, setUloga] = useState([])

  const [refresh, setRefresh] = useState(false)

  const modal = () => {
    setIsModal(true)
    document.body.style.overflow = 'hidden'
   }

  const search = (data) => {
     return data.filter(
      (item)=> 
      item.naziv.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.opis.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) 
  }

   // fetch data
   const dataFetch = async () => {
    const data = await (
      await fetch(
        "http://localhost:3001/clanoviEO"
      )
    ).json();

    // set state when the data received
    setData(data);
  };


    // fetch data
    const ulogaFetch = async () => {
      const data = await (
        await fetch(
          "http://localhost:3001/ulogaEO"
        )
      ).json();
  
      // set state when the data received
      setUloga(data);
    };

  useEffect(() => {
    dataFetch();
    ulogaFetch();
  }, [refresh]);

  const refreshFunc = () => {

    setRefresh(prev => !prev) 
  
  }


  return (
   
    <div className={classes.dijeteWrapper}>
    <div className={classes.components}>
       <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
       <button onClick={modal} className={classes.add}>Dodaj novog člana</button>
     { isModal && <AddKorisniciModal refresh={refreshFunc} closeModal={setIsModal} title="Dodaj novog člana" />}
          </div> 
      <div className={classes.row_heading}>
      <div className={`${classes.heading} ${classes.half}`}>Ime</div>
      <div className={`${classes.heading} ${classes.half}`}>Prezime</div>
      <div className={`${classes.heading} ${classes.half}`}>JMBG</div>
      <div className={`${classes.heading} ${classes.half}`}>Uloga</div>
      <div className={`${classes.heading} ${classes.half}`}>Datum od</div>
      <div className={`${classes.heading} ${classes.half}`}>Datum do</div>
    </div>
       <KorisniciTabela uloga={uloga} refresh={refreshFunc} data={data}  /> 
  
  </div>
  );
}

export default Statusi