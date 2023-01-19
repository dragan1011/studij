import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'

import classes from './AddDokumentModal.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Calendar } from 'react-date-range';
import { format } from 'date-fns'


const ModalOverlay = (props) => {

  
  const [data, setData] = useState('')
  const [datum, setDatum] = useState('')
  const [oznaka, setOznaka] = useState('')
  const [napomena, setNapomena] = useState(false)
  const [datumIsValid, setDatumIsValid] = useState(false)
  const [oznakaIsValid, setOznakaIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)
  const [date, setDate] = useState(new Date);
  let formatedDate = format(date, 'yyyy-MM-dd' )
  const [showCalendar, setShowCalendar] = useState(false)

  const datumRef = useRef(null)
  const oznakaRef = useRef(null)
  const napomenaRef = useRef(null)
  const refCloseCalendar = useRef(null)



  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
    document.addEventListener('click', hideOnClickOutside, true)
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
    
    console.log(formatedDate, oznaka, napomena)

notify();
      Axios.post('http://localhost:3001/dokumentDodaj', {
        vrsta: 'ulaz',
        datum: formatedDate, 
        oznaka: oznaka,
        id_studijskog_centra: 10,
        broj_dostavnice: 0,
        id_veze: 0,
        storno: 0,
        napomena: napomena,
        id_statusa: 1
      }).then((response)=> {
        props.refresh();
        console.log(response)
      })
    
     setTimeout( async()=> {
 close() 
}, 1000);

   }

  
 
  const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   } 
   const showCalendarFunc = () => {
    setShowCalendar(prevState => !prevState)
   }
   const hideOnClickOutside = (e) => {
    if (refCloseCalendar.current && !refCloseCalendar.current.contains(e.target)) {
  setShowCalendar(false)
  }
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
   <label className={classes.label}>Datum</label>
  <input value={formatedDate} onClick={showCalendarFunc} onChange={e => setDatum(e.target.value)}  className={`${classes.input} ${classes.dateInput}`} type="text" />
    </div> 
    <div ref={refCloseCalendar} >
  {showCalendar && <Calendar style={{zIndex: 100000}} className={classes.Calendar} onChange={item => setDate(item)} />}
</div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Oznaka</label>
   <input ref={oznakaRef} onChange={e => setOznaka(e.target.value)}  className={`${classes.input} ${oznakaIsValid&&(oznaka.trim()===null || oznaka.trim() === '')  ? classes.border : ''}`} type="text" />
 </div>
    <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
   <input ref={napomenaRef} onChange={e => setNapomena(e.target.value)}  className={`${classes.input} ${napomenaIsValid&&(napomena.trim()===null || napomena.trim() === '')  ? classes.border : ''}`} type="text" />
  </div>

     

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