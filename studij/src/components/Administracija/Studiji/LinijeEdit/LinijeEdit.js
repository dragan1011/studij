import { Fragment, useRef } from 'react';
import ReactDOM from 'react-dom';

import classes from './LinijeEdit.module.css';
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  const nazivRef = useRef();
  const lokacijaRef = useRef();
  const odjelRef = useRef();

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



    const editData = async(e) => {
    e.preventDefault();

    notify();

    setTimeout( async()=> {
    await setDoc(doc(db, "linije", `${nazivRef.current.value}`), {
      
      naziv:nazivRef.current.value,
      lokacija:lokacijaRef.current.value,
      odjel: odjelRef.current.value

    });

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
   <label className={classes.label}>Šifra dijete</label>
    <input ref={nazivRef} value={props.data.naziv} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Lokacija</label>
    <select ref={lokacijaRef} defaultValue={props.data.lokacija} className={classes.input} type="text" >
    <option className={classes.option}>Klinički centar</option>
      </select>
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Grupa</label>
    <select ref={odjelRef} defaultValue={props.data.odjel} className={classes.input} type="text" >
    <option className={classes.option}>1070 - Klinika za dječiju hirurgiju</option>
      </select>
   </div>
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
        <ModalOverlay data={props.data} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;