import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddUlogeModal.module.css';

import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {



  const [naziv, setNaziv] = useState('')
  const [opis, setOpis] = useState('')
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [opisIsValid, setOpisIsValid] = useState(false)


  const nazivRef = useRef(null)
  const opisRef = useRef(null)

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
    toast.success(`Uloga je uspešno dodana!`, {
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

   console.log(naziv, opis)

    if (naziv.trim() == '' || naziv.trim().length == 0) {
      nazivRef.current.focus()
      return setNazivIsValid(true)
    }
    if (nazivRef.current === document.activeElement) {
      opisRef.current.focus()
    }
    if (opis === ''|| opis === null || opis.length>0&&opis.length<3) {
      opisRef.current.focus()
      return setOpisIsValid(true)
    }
   
      
      notify();
      setTimeout( async()=> {

        Axios.post('http://localhost:3001/ulogaEODodaj', {
          nazivUloga: naziv,
          opisUloga: opis
        }).then((response)=> {
           props.refresh();
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
   <label className={classes.label}>Opis</label>
   <input ref={opisRef} onChange={e => setOpis(e.target.value)}  className={`${classes.input} ${opisIsValid&&(opis.trim()===null || opis.trim() === '')  ? classes.border : ''}`} type="text" />
{/*       {lokacijaIsValid&&lokacija==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
  */}  </div>

   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj ulogu</button>
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
        <ModalOverlay submitData={props.submitData} refresh={props.refresh} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;