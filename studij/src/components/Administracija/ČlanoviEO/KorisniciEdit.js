import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Axios  from 'axios';

import classes from './KorisniciEdit.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const ModalOverlay = (props) => {

  const [ime, setIme] = useState(props.data.ime)
  const [prezime, setPrezime] = useState(props.data.prezime)
  const [jmbg, setJmbg] = useState(props.data.jmbg)
  const [imeIsValid, setImeIsValid] = useState(false)
  const [prezimeIsValid, setPrezimeIsValid] = useState(false)
  const [jmbgIsValid, setJmbgIsValid] = useState(false)


  const notify = () => {
    toast.success('Uspješno izmijenjeno!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
  }

    const editData = async(e) => {
    e.preventDefault();

    if (ime === ''|| ime === null) {
      return setImeIsValid(true)
    }
    if (prezime === ''|| prezime === null) {
      return setPrezimeIsValid(true)
    }
    if (jmbg === ''|| jmbg === null) {
      return setJmbgIsValid(true)
    }
  

    notify();
    Axios.put('http://localhost:3001/clanEOUpdate', {
      id: props.data.id,
      ime: ime,
      prezime: prezime,
      jmbg: jmbg,
      datumOd: value[0],
      datumDo: value[1],

    }).then((response)=> {
      props.refresh();
      console.log(response)
    })

    close();

      }
  

   const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   }
   const [value, setValue] = useState([ props.data.datum_od, props.data.datum_do]);

   useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

  return (
    <div>
      <ToastContainer />
      <div onClick={() => {props.closeModal(false)}} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
        <form  onSubmit={editData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Ime</label>
    <input onChange={e => setIme(e.target.value)} defaultValue={props.data.ime} className={`${classes.input} ${imeIsValid&&(ime.trim()===null || ime.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Prezime</label>
    <input onChange={e => setPrezime(e.target.value)} defaultValue={props.data.prezime} className={`${classes.input} ${prezimeIsValid&&(prezime.trim()===null || prezime.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>JMBG</label>
    <input onChange={e => setJmbg(e.target.value)} defaultValue={props.data.jmbg} className={`${classes.input} ${jmbgIsValid&&(jmbg.trim()===null || jmbg.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <label className={classes.label}>Datum</label>
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
         <Box sx={{ mx: 1 }}> Od </Box>
            <input className={classes.input} onChange={startProps.inputRef} {...startProps.inputProps} />
             <Box sx={{ mx: 1 }}> do </Box>
            <input className={classes.input} onChange={endProps.inputRef} {...endProps.inputProps} />
          </>
        )}
      />
    </LocalizationProvider>
  
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj izmjene</button>
          <button  onClick={() => {props.closeModal(false)}} className={classes.close}>Otkaži</button>
        </footer>
    </form>
        </div>
       
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay refresh={props.refresh} uloga={props.uloga} data={props.data} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;