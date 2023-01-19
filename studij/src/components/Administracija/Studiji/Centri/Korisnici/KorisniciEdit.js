import { Fragment, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import Axios  from 'axios';

import classes from './KorisniciEdit.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const ModalOverlay = (props) => {

  const [korisnik, setKorisnik] = useState(props.data.imePrezime)
  const [korisnikIsValid, setKorisnikIsValid] = useState(false)

  const [selectedOption, setSelectedOption] = useState(Number(props.data.aktivno) === Number(1) ? 'Aktivan' : 'Neaktivan');
  const [focusedOption, setFocusedOption] = useState('');
  const [showList, setShowList] = useState(false)
  const [selectedOptionId,setSelectedOptionId] = useState(Number(props.data.aktivno) === Number(1) ? '1' : '2')

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

  const notify = () => {
    toast.success('Uspješno izmijenjeno!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
  }

  const data = [{"id":1,"naziv":"Aktivan"},
  {"id":2,"naziv":"Neaktivan"}]

    const editData = async(e) => {
    e.preventDefault();

    if (korisnik === ''|| korisnik === null) {
      return setKorisnikIsValid(true)
    }

    console.log(props.data.id ,korisnik, value[0], value[1], selectedOptionId)

    notify();
    Axios.put('http://localhost:3001/korisnikUpdate', {
      id: props.data.id,
      imePrezime: korisnik,
      datumOd: value[0],
      datumDo: value[1],
      aktivno: selectedOptionId,

    }).then((response)=> {
      props.refresh();
      console.log(response)
    })

    close();

      }
  

   const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   }
   const [value, setValue] = useState([ props.data.datum_od, props.data.datum_do]);

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
   <label className={classes.label}>Ime i prezime korisnika</label>
    <input onChange={e => setKorisnik(e.target.value)} defaultValue={props.data.imePrezime} className={classes.input} type="text" />
   </div>
   <label className={classes.label}>Datum</label>
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
         <Box sx={{ mx: 1 }}> Od </Box>
            <input className={classes.input} onChange={startProps.inputRef} {...startProps.inputProps} />
             <Box sx={{ mx: 1 }}> do </Box>
            <input className={classes.input} onChange={endProps.inputRef} {...endProps.inputProps} />
          </>
        )}
      />
    </LocalizationProvider>
    <div className={classes.smallWrapper}>
   <label className={classes.label}>Uloga</label>
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
        <ModalOverlay refresh={props.refresh} uloga={props.uloga} data={props.data} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;