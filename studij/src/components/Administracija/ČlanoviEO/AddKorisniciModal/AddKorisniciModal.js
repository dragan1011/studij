import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddKorisniciModal.module.css';


import Axios  from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import {format} from "date-fns";

const ModalOverlay = (props) => {

  const [active, setActive] = useState('Izmjena')
  const [data, setData] = useState([])

   // fetch data
   const statuFetch = async () => {
    const data = await (
      await fetch(
        "http://localhost:3001/ulogaEO"
      )
    ).json();

    // set state when the data received
    setData(data);
  };



  useEffect(() => {
    imeRef.current.focus()
    statuFetch();
  },[])


  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 


  const notifyAdd = () => {
    toast.success('Korisnik je uspješno dodan!', {
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


  const [imeIsValid , setImeIsValid] = useState(false)
  const [prezimeIsValid , setPrezimeIsValid] = useState(false)
  const [jmbgIsValid , setJmbgIsValid] = useState(false)
  const [ulogaIsValid , setUlogaIsValid] = useState(false)
  const [ime, setIme] = useState('')
  const [prezime, setPrezime] = useState('')
  const [jmbg, setJmbg] = useState('')
  const [value, setValue] = useState([ new Date, new Date]);

  const imeRef = useRef(null)
  const prezimeRef = useRef(null)
  const jmbgRef = useRef(null)
  const ulogaRef = useRef(null)

  //Dodavanje korisnika
  const addNewKorisnik = async (e) => {
    e.preventDefault();


    let datumOd = `${value[0].$y}-${value[0].$M+1}-${value[0].$D}`
    let datumDo = `${value[1].$y}-${value[1].$M+1}-${value[1].$D}`
 
    if (ime.trim() === ''|| ime.trim() === null) {
      imeRef.current.focus()
      return setImeIsValid(true)
    }
    if (imeRef.current === document.activeElement) {
      prezimeRef.current.focus()
    }
    if (prezime.trim() === ''|| prezime.trim() === null) {
      prezimeRef.current.focus()
      return setPrezimeIsValid(true)
    }
    if (prezimeRef.current === document.activeElement) {
      jmbgRef.current.focus()
    }
    if (jmbg.trim() === ''|| jmbg.trim() === null) {
      jmbgRef.current.focus()
      return setJmbgIsValid(true)
    }
    if (selectedOption.trim() === ''|| selectedOption.trim() === null) {
      return setUlogaIsValid(true)
    }

    notifyAdd();


       Axios.post('http://localhost:3001/clanEODodaj', {
      ime: ime,
      prezime:prezime,
      jmbg:jmbg,
      id_uloga: selectedOptionId,
      datumOd: datumOd,
      datumDo: datumDo,

    }).then((response)=> {
      props.refresh();
      console.log(response)
    }) 
  
    close();

  } 
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
       {  active === 'Izmjena' && <div className={classes.content}>
        <form onSubmit={addNewKorisnik}  className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Ime</label>
    <input ref={imeRef} onChange={e => setIme(e.target.value)} className={`${classes.input} ${imeIsValid&&(ime.trim()===null || ime.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Prezime</label>
    <input ref={prezimeRef} onChange={e => setPrezime(e.target.value)} className={`${classes.input} ${prezimeIsValid&&(prezime.trim()===null || prezime.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>JMBG</label>
    <input ref={jmbgRef} onChange={e => setJmbg(e.target.value)} className={`${classes.input} ${jmbgIsValid&&(jmbg.trim()===null || jmbg.trim() === '')  ? classes.border : ''}`} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Uloga</label>
<input
ref={ulogaRef}
className={`${classes.input} ${ulogaIsValid&&(selectedOption.trim()===null || selectedOption.trim() === '')  ? classes.border : ''}`}
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
 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
         <Box sx={{ mx: 1 }}> Do </Box>
            <input className={classes.input} onChange={startProps.inputRef} {...startProps.inputProps} />
             <Box sx={{ mx: 1 }}> do </Box>
            <input className={classes.input} onChange={endProps.inputRef} {...endProps.inputProps} />
          </>
        )}
      />
    </LocalizationProvider>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj</button>
          <button  onClick={() => {props.closeModal(false)}} className={classes.close}>Otkaži</button>
        </footer>
    </form>
        </div> }
       
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay refresh={props.refresh} data={props.data} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;