import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'

import classes from './AddDokumentModal.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalOverlay = (props) => {

  
  const [data, setData] = useState('')
  const [datum, setDatum] = useState('')
  const [oznaka, setOznaka] = useState('')
  const [napomena, setNapomena] = useState(false)
  const [datumIsValid, setDatumIsValid] = useState(false)
  const [oznakaIsValid, setOznakaIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)


  const datumRef = useRef(null)
  const oznakaRef = useRef(null)
  const napomenaRef = useRef(null)



  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
   // datumRef.current.focus()
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

   const notify = () => {
    toast.success('Dokument je uspješno dodan!', {
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

     if (oznaka.trim() == '' || oznaka.trim().length == 0) {
      oznakaRef.current.focus()
      return setOznakaIsValid(true)
    }
    if (oznakaRef.current === document.activeElement) {
      napomenaRef.current.focus()
    }
    if (napomena === ''|| napomena === null) {
      napomenaRef.current.focus()
      return setNapomenaIsValid(true)
    }
    

    notify();
/*       setTimeout( async()=> {

      Axios.post('http://localhost:3001/lijekDodaj', {
        oznaka: oznaka,
        napomena: napomena,
        jmId: selectedOptionId,
        id_rezim: selectedOptionId,
        id_studija: props.studijId
      }).then((response)=> {
        props.refresh();
        console.log(response)
      })

 close() 
}, 1000);
  */
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
   {/* <div className={classes.smallWrapper}>
   <label className={classes.label}>Datum</label>
  <input ref={nazivRef} onChange={e => setNaziv(e.target.value)}  className={`${classes.input} ${nazivIsValid&&(naziv.trim()===null || naziv.trim() === '')  ? classes.border : ''}`} type="text" />
     {nazivIsValid&&naziv.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.length>0&&naziv.length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
    </div> */}

   <div className={classes.smallWrapper}>
   <label className={classes.label}>Oznaka</label>
   <input ref={oznakaRef} onChange={e => setOznaka(e.target.value)}  className={`${classes.input} ${oznakaIsValid&&(oznaka.trim()===null || oznaka.trim() === '')  ? classes.border : ''}`} type="text" />
{/*       {lokacijaIsValid&&lokacija==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
  */}  </div>
    <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
   <input ref={napomenaRef} onChange={e => setNapomena(e.target.value)}  className={`${classes.input} ${napomenaIsValid&&(napomena.trim()===null || napomena.trim() === '')  ? classes.border : ''}`} type="text" />
{/*       {lokacijaIsValid&&lokacija==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
  */}  </div>

     

   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj dokument</button>
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
        <ModalOverlay studijId={props.studijId} submitData={props.submitData} refresh={props.refresh} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;