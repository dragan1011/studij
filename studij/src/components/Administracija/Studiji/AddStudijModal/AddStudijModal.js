import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddStudijModal.module.css';

import Axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const ModalOverlay = (props) => {

  

  const [broj, setBroj] = useState('')
  const [opis, setOpis] = useState('')
  const [brojIsValid, setBrojIsValid] = useState(false)
  const [opisIsValid, setOpisIsValid] = useState(false)
  const [sponzorIsValid, setSponzorIsValid] = useState(false)
  const [sponzorList, setSponzorList] = useState([])

  const [selectedOption, setSelectedOption] = useState('');
  const [focusedOption, setFocusedOption] = useState('');
  const [showList, setShowList] = useState(false)
  const [selectedOptionId,setSelectedOptionId] = useState('')
  const [statusNaziv, setStatusNaziv] = useState('Na čekanju');
  const [statusId,setStatusId] = useState('3')

  const [value, setValue] = useState([ null, null]);

  const brojRef = useRef(null)
  const opisRef = useRef(null)
  const sponzorRef = useRef(null)
  const statusRef = useRef(null)
  const buttonRef = useRef(null)
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)

  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
    brojRef.current.focus()
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

   const notify = () => {
    toast.success('Uspješno dodano!', {
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
    e.preventDefault()

    let datumOd = `${value[0].$y}-${value[0].$M+1}-${value[0].$D}`
    let datumDo = `${value[1].$y}-${value[1].$M+1}-${value[1].$D}`

     if (broj.trim() == '' || broj.trim().length == 0) {
      brojRef.current.focus()
      return setBrojIsValid(true) 
    }
    if (brojRef.current === document.activeElement) {
      opisRef.current.focus()
    }
  
    if (opis === ''|| opis === null || broj.length>0&&opis.length<3) {
      opisRef.current.focus()
      return setOpisIsValid(true)
    }
    if (opisRef.current === document.activeElement) {
      sponzorRef.current.focus();
    }
    if (sponzorRef.current === document.activeElement) {
      setShowList(true)
    }
     if (selectedOption === ''|| selectedOption === null ) {
      sponzorRef.current.focus()
      return setSponzorIsValid(true)
    } 
  
    notify();


     setTimeout( async()=> {
 

       Axios.post('http://localhost:3001/studijDodaj', {
        broj: broj,
        datumOd: datumOd,
        datumDo: datumDo,
        opis: opis,
        sponzor: selectedOptionId,
        status: statusId

      }).then((response)=> {
        props.refresh();
        console.log(response)
      })


 close() 
}, 1000);
   
  } 

      // fetch data
      const statuFetch = async () => {
        const data = await (
          await fetch(
            "http://localhost:3001/sponzor"
          )
        ).json();
  
        // set state when the data received
        setSponzorList(data);
      };


 
      useEffect(() => {
        statuFetch();
      },[])


  const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   } 

   const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

   
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      // Move focus to next option
      const currentIndex = sponzorList.indexOf(focusedOption);
      if (currentIndex < sponzorList.length - 1) {
        setFocusedOption(sponzorList[currentIndex + 1]);
      }
    } else if (event.key === 'ArrowUp') {
      // Move focus to previous option
      const currentIndex = sponzorList.indexOf(focusedOption);
      if (currentIndex > 0) {
        setFocusedOption(sponzorList[currentIndex - 1]);
      }
    } else if (event.key === 'Enter') {
      setSelectedOption(focusedOption.naziv);
      setSelectedOptionId(focusedOption.id);
      setShowList(false)
    }
  };

  const showListFunc = () => {
    setShowList(!showList)
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
        <form className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Broj</label>
  <input ref={brojRef} min={0} onChange={e => setBroj(e.target.value)}  className={`${classes.input} ${brojIsValid&&(broj.trim()===null || broj.trim() === '')  ? classes.border : ''}`} type="number" />
  </div>

<div className={classes.smallWrapper}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
         <Box sx={{ mx: 1 }}> Do </Box>
            <input ref={startDateRef} className={classes.input} onChange={startProps.inputRef} {...startProps.inputProps} />
             <Box sx={{ mx: 1 }}> do </Box>
            <input ref={endDateRef} className={classes.input} onChange={endProps.inputRef} {...endProps.inputProps} />
          </>
        )}
      />
    </LocalizationProvider>
 </div>

   <div className={classes.smallWrapper}>
   <label className={classes.label}>Opis</label>
   <input ref={opisRef} onChange={e => setOpis(e.target.value)}  className={`${classes.input} ${opisIsValid&&(opis.trim()===null || opis.trim() === '')  ? classes.border : ''}`} type="text" />
    </div>

   <div className={classes.smallWrapper}>
   <label className={classes.label}>Sponzor</label>
<input
        className={classes.input}
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
        {sponzorList.map((option) => (
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
          >
            {option.naziv}
          </div>
        ))}
      </div>}
      </div>
      <div className={classes.smallWrapper}>
   <label className={classes.label}>Status</label>
   <input className={`${classes.input}`}
        type="text"
        value={statusNaziv}
        disabled={true}
        placeholder="Odjel"
        ref={statusRef}
      />
      </div>
   <footer className={classes.actions}>
          <button ref={buttonRef} onClick={addNewData} type='submit' className={classes.button}>Dodaj liniju</button>
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
        <ModalOverlay refresh={props.refresh} submitData={props.submitData} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;