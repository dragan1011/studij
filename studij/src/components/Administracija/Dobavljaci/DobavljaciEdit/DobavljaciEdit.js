import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './DobavljaciEdit.module.css';

import Axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {


  const [naziv, setNaziv] = useState(props.data.naziv)
  const [adresa, setAdresa] = useState(props.data.adresa)
  const [drzava, setDrzava] = useState(props.data.drzava)
  const [jib, setJib] = useState(props.data.jib)
  const [telefon, setTelefon] = useState(props.data.telefon)
  const [napomena, setNapomena] = useState(props.data.napomena)
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [adresaIsValid, setAdresaIsValid] = useState(false)
  const [drzavaIsValid, setDrzavaIsValid] = useState(false)
  const [jibIsValid, setJibIsValid] = useState(false)
  const [telefonIsValid, setTelefonIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)


  const nazivRef = useRef(null)
  const adresaRef = useRef(null)
  const drzavaRef = useRef(null)
  const jibRef = useRef(null)
  const telefonRef = useRef(null)
  const napomenaRef = useRef(null)



  const notify = () => {
    toast.success('Uspješno izmijenjeno!', {
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


  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
    nazivRef.current.focus()
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 



    const editData = async(e) => {
    e.preventDefault();


    if (naziv.trim() == '' || naziv.trim().length == 0) {
      nazivRef.current.focus()
      return setNazivIsValid(true)
    }
    if (nazivRef.current === document.activeElement) {
      adresaRef.current.focus()
    }
    if (adresa === ''|| adresa === null || adresa.length>0&&adresa.length<3) {
      adresaRef.current.focus()
      return setAdresaIsValid(true)
    }
    if (adresaRef.current === document.activeElement) 
     {
      drzavaRef.current.focus()
    }
    if (drzava === ''|| drzava === null || drzava.length>0&&drzava.length<3) {
      drzavaRef.current.focus()
      return setDrzavaIsValid(true)
    }
    if (drzavaRef.current === document.activeElement) 
    {
     jibRef.current.focus()
    }
    if (jib === ''|| jib === null || jib.length>0&&jib.length<3) {
      jibRef.current.focus()
     return setJibIsValid(true)
    }
    if (jibRef.current === document.activeElement) 
    {
    telefonRef.current.focus()
    }
    if (telefon === ''|| telefon === null || telefon.length>0&&telefon.length<3) {
      telefonRef.current.focus()
    return setTelefonIsValid(true)
    }
    if (telefonRef.current === document.activeElement) 
    {
    napomenaRef.current.focus()
    }
    if (napomena === ''|| napomena === null || napomena.length>0&&napomena.length<3) {
      napomenaRef.current.focus()
    return setNapomenaIsValid(true)
    }

    notify();

  
    setTimeout( async()=> {
      Axios.put('http://localhost:3001/sponzorUpdate', {
        id: props.data.id,
        naziv: naziv,
        adresa: adresa,
        drzava: drzava,
        jib: jib,
        telefon: telefon,
        napomena: napomena

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
      <div onClick={() => {props.closeModal(false)}} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
        <form  onSubmit={editData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <input spellCheck={false} ref={nazivRef} onChange={e => setNaziv(e.target.value)} defaultValue={props.data.naziv} className={`${classes.input} ${nazivIsValid&&(naziv.trim()===null || naziv.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Adresa</label>
   <input spellCheck={false} ref={adresaRef} onChange={e => setAdresa(e.target.value)} defaultValue={props.data.adresa} className={`${classes.input} ${adresaIsValid&&(adresa.trim()===null || adresa.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Država</label>
   <input spellCheck={false} ref={drzavaRef} onChange={e => setDrzava(e.target.value)} defaultValue={props.data.drzava} className={`${classes.input} ${drzavaIsValid&&(drzava.trim()===null || drzava.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>JIB</label>
   <input spellCheck={false} ref={jibRef} onChange={e => setJib(e.target.value)} defaultValue={props.data.jib} className={`${classes.input} ${jibIsValid&&(jib.trim()===null || jib.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Telefon</label>
   <input spellCheck={false} ref={telefonRef} onChange={e => setTelefon(e.target.value)} defaultValue={props.data.telefon} className={`${classes.input} ${telefonIsValid&&(telefon.trim()===null || telefon.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
   <input spellCheck={false} ref={napomenaRef} onChange={e => setNapomena(e.target.value)} defaultValue={props.data.napomena} className={`${classes.input} ${napomenaIsValid&&(napomena.trim()===null || napomena.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Sačuvaj</button>
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
        <ModalOverlay data={props.data} refresh={props.refresh} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;