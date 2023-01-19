import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'

import classes from './AddLijekModal.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalOverlay = (props) => {

  
  const [data, setData] = useState('')
  const [naziv, setNaziv] = useState('')
  const [sifra, setSifra] = useState('')
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [sifraIsValid, setSifraIsValid] = useState(false)
  const [jmIsValid, setJmIsValid] = useState(false)
  const [rezimIsValid, setRezimIsValid] = useState(false)


  const nazivRef = useRef(null)
  const sifraRef = useRef(null)
  const jmRef = useRef(null)
  const rezimRef = useRef(null)



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
    toast.success('Status je uspješno dodan!', {
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
    if (sifraRef.current === document.activeElement) {
      setShowList(true)
      jmRef.current.focus()
    }
    if (selectedOption.trim() == '' || selectedOption.trim().length == 0) {
      jmRef.current.focus()
      return setJmIsValid(true)
    }
    if (jmRef.current === document.activeElement) {
      rezimRef.current.focus()
      setShowStatus(true)
    }
    if (selectedStatus.trim() == '' || selectedStatus.trim().length == 0) {
      rezimRef.current.focus()
      return setRezimIsValid(true)
    } 
       

    notify();
      setTimeout( async()=> {

      Axios.post('http://localhost:3001/lijekDodaj', {
        naziv: naziv,
        sifra: sifra,
        jmId: selectedOptionId,
        id_rezim: selectedOptionId,
        id_studija: props.studijId
      }).then((response)=> {
        props.refresh();
        console.log(response)
      })

 close() 
}, 1000);
 
   }

   
const [statusKorisnika, setStatusKorisnika] = useState('')

// fetch data
   const jmFetch = async () => {
    const data = await (
      await fetch(
        "http://localhost:3001/jm"
      )
    ).json();

    // set state when the data received
    setData(data);
  };

// fetch data
const rezimFetch = async () => {
  const data = await (
    await fetch(
      "http://localhost:3001/rezimCuvanja"
    )
  ).json();

  // set state when the data received
  setStatusKorisnika(data);
};


  useEffect(() => {
    jmFetch();
    rezimFetch();
  },[])

//Dropdown list choice

const [selectedOption, setSelectedOption] = useState('');
const [focusedOption, setFocusedOption] = useState('');
const [showList, setShowList] = useState(false)
const [selectedOptionId,setSelectedOptionId] = useState('')

const handleChange = (event) => {
  setSelectedOption(event.target.value);
};

 
const handleKeyDown = (event) => {
  if (event.key === 'ArrowDown') {
    // Move focus to next option
    const currentIndex = data.indexOf(focusedOption);
    if (currentIndex < data.length - 1) {
      setFocusedOption(data[currentIndex + 1]);
    }
  } else if (event.key === 'ArrowUp') {
    // Move focus to previous option
    const currentIndex = data.indexOf(focusedOption);
    if (currentIndex > 0) {
      setFocusedOption(data[currentIndex - 1]);
    }
  } else if (event.key === 'Enter') {
    setSelectedOption(focusedOption.naziv);
    setSelectedOptionId(focusedOption.id);
    setShowList(false)
  }
};

const showListFunc = () => {
  setShowList(!showList)
  setShowStatus(false)
}



const [selectedStatus, setSelectedStatus] = useState('');
const [focusedStatus, setFocusedStatus] = useState('');
const [showStatus, setShowStatus] = useState(false)
const [selectedStatusId,setSelectedStatusId] = useState('')

const handleChangeOption = (event) => {
  setSelectedStatus(event.target.value);
};

 
const handleKey = (event) => {
  if (event.key === 'ArrowDown') {
    // Move focus to next option
    const currentIndex = statusKorisnika.indexOf(focusedStatus);
    if (currentIndex < statusKorisnika.length - 1) {
      setFocusedStatus(statusKorisnika[currentIndex + 1]);
    }
  } else if (event.key === 'ArrowUp') {
    // Move focus to previous option
    const currentIndex = statusKorisnika.indexOf(focusedStatus);
    if (currentIndex > 0) {
      setFocusedStatus(statusKorisnika[currentIndex - 1]);
    }
  } else if (event.key === 'Enter') {
    setSelectedStatus(focusedStatus.naziv);
    setSelectedStatusId(focusedStatus.id);
    setShowStatus(false)
  }

} 

const showStatusFunc = () => {
  setShowStatus(!showStatus)
  setShowList(false)
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
 <div className={classes.smallWrapper}>
   <label className={classes.label}>Jedinica mjere</label>
<input 
        ref={jmRef}
       className={`${classes.input} ${jmIsValid&&(selectedOption.trim()===null || selectedOption.trim() === '')  ? classes.border : ''}`}
        type="text"
        value={selectedOption}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={showListFunc}
      />
       { showList && <div
       className={classes.options}
        style={{ display: 'block' }}
        onMouseDown={(event) => {
          // Show options list
        }}
      >
        {data.map((option) => (
          <div 
            key={option.id}
            style={{
              backgroundColor: option === focusedOption ? '#eee' : 'white',
            }}
            onMouseDown={(event) => {
              setSelectedOption(option.naziv);
              setSelectedOptionId(option.id)
              setShowList(false)
            }}
            onMouseEnter={(event) => {
              setFocusedOption(option);
            }}
            className={classes.optionSelect}
          >
            {option.naziv}
          </div>
        ))}
      </div>}
      </div>
<div className={classes.smallWrapper}>
   <label className={classes.label}>Režim čuvanja</label>
<input
  ref={rezimRef}
       className={`${classes.input} ${rezimIsValid&&(selectedStatus.trim()===null || selectedStatus.trim() === '')  ? classes.border : ''}`}
        type="text"
        value={selectedStatus}
        onChange={handleChangeOption}
        onKeyDown={handleKey}
        onClick={showStatusFunc}
      />
       { showStatus && <div
       className={classes.options}
        style={{ display: 'block' }}
        onMouseDown={(event) => {
          // Show options list
        }}
      >
        {statusKorisnika.map((option) => (
          <div 
            key={option.id}
            style={{
              backgroundColor: option === focusedStatus ? '#eee' : 'white',
            }}
            onMouseDown={(event) => {
              setSelectedStatus(option.naziv);
              setSelectedStatusId(option.id)
              setShowStatus(false)
            }}
            onMouseEnter={(event) => {
              setFocusedStatus(option);
            }}
            className={classes.optionSelect}
          >
            {option.naziv}
          </div>
        ))}
      </div>}
      </div>

     

   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj lijek</button>
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