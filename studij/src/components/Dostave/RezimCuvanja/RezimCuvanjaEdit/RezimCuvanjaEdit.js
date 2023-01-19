import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './RezimCuvanjaEdit.module.css';

import Axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  const [naziv, setNaziv] = useState(props.data.naziv)
  const [opis, setOpis] = useState(props.data.opis)
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [opisIsValid, setOpisIsValid] = useState(false)

  const nazivRef = useRef();
  const opisRef = useRef();

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
      opisRef.current.focus()
    }
    if (opis === ''|| opis === null || opis.length>0&&opis.length<3) {
      opisRef.current.focus()
      return setOpisIsValid(true)
    }
    

    notify();

     setTimeout( async()=> {
Axios.put('http://localhost:3001/rezimCuvanjaUpdate', {
  id: props.data.id,
  naziv: naziv,
  opis: opis
})
props.refresh()

    close();
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
   <label className={classes.label}>Opis</label>
   <input spellCheck={false} ref={opisRef} onChange={e => setOpis(e.target.value)} defaultValue={props.data.opis} className={`${classes.input} ${opisIsValid&&(opis.trim()===null || opis.trim() === '')  ? classes.border : ''}`} type="text" />
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