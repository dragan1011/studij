import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddCentarModal.module.css';

import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {



  const [naziv, setNaziv] = useState('')
  const [sifra, setSifra] = useState('')
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [sifraIsValid, setSifraIsValid] = useState(false)


  const nazivRef = useRef(null)
  const sifraRef = useRef(null)

  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
    nazivRef.current.focus()
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

   const notify = () => {
    toast.success(`Centar je uspešno dodan!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
  }

   const addNewData = async (e) => {
    e.preventDefault();

   
    if (naziv.trim() == '' || naziv.trim().length == 0) {
      nazivRef.current.focus()
      return setNazivIsValid(true)
    }
    if (nazivRef.current === document.activeElement) {
      sifraRef.current.focus()
    }
    if (sifra === ''|| sifra === null || sifra.length>0&&sifra.length<3) {
      sifraRef.current.focus()
      return setSifraIsValid(true)
    }
   
      
      notify();
      setTimeout( async()=> {

        Axios.post('http://localhost:3001/centarDodaj', {
          nazivCentar: naziv,
          sifraCentar: sifra,
          id_studija:  props.data.id
        }).then((response)=> {
          props.refresh()
          console.log(response)
        })
  
   close() 
  }, 1000);
 
  } 
 
  const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   } 

  return (
    <div>
      
          <ToastContainer />
    <div onClick={close} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
        <form onSubmit={addNewData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
  <input ref={nazivRef} onChange={e => setNaziv(e.target.value)}  className={`${classes.input} ${nazivIsValid&&(naziv.trim()===null || naziv.trim() === '')  ? classes.border : ''}`} type="text" />
{/*     {nazivIsValid&&naziv.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.length>0&&naziv.length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
  */}  </div>

   <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra</label>
   <input ref={sifraRef} onChange={e => setSifra(e.target.value)}  className={`${classes.input} ${sifraIsValid&&(sifra.trim()===null || sifra.trim() === '')  ? classes.border : ''}`} type="text" />
{/*       {lokacijaIsValid&&lokacija==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
  */}  </div>

   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj centar</button>
          <button onClick={close} className={classes.close}>Otkaži</button>
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
        <ModalOverlay data={props.data} refresh={props.refresh} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;