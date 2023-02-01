import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./AddKorisnikModal.module.css";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Calendar } from "react-date-range";
import { format } from "date-fns";

const ModalOverlay = (props) => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telefon, setTelefon] = useState("");
  const [pol, setPol] = useState("Pol");
  const [email, setEmail] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [date, setDate] = useState(new Date);
  const [imeIsValid, setImeIsValid] = useState(false);
  const [prezimeIsValid, setPrezimeIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [telefonIsValid, setTelefonIsValid] = useState(false);
  const [polsValid, setPolIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [jmbgIsValid, setJmbgIsValid] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false);
  let formatedDate = format(date, "yyyy-MM-dd");
  const [datum, setDatum] = useState("");

  const imeRef = useRef(null);
  const prezimeRef = useRef(null);
  const refCloseCalendar = useRef(null);
  const usernameRef = useRef(null)
  const passowrdRef = useRef(null)
  const telefonRef = useRef(null)
  const polRef = useRef(null)
  const emailRef = useRef(null)
  const jmbgRef = useRef(null)
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const showCalendarFunc = () => {
    setShowCalendar((prevState) => !prevState);
  };
  const hideOnClickOutside = (e) => {
    if (
      refCloseCalendar.current &&
      !refCloseCalendar.current.contains(e.target)
    ) {
      setShowCalendar(false);
    }
  };


  const notify = () => {
    toast.success(`Korisnik je uspešno dodana!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const addNewData = async (e) => {
    e.preventDefault();

     if (ime.trim() == '' || ime.trim().length == 0) {
      imeRef.current.focus()
      return setImeIsValid(true)
    }
    if (imeRef.current === document.activeElement) {
      prezimeRef.current.focus()
    }
    if (prezime === ''|| prezime === null) {
      prezimeRef.current.focus()
      return setPrezimeIsValid(true)
    }
    if (prezimeRef.current === document.activeElement) {
      usernameRef.current.focus()
    }
    if (username === ''|| username === null) {
      usernameRef.current.focus()
      return setUsernameIsValid(true)
    }
    if (usernameRef.current === document.activeElement) {
      passowrdRef.current.focus()
    }
    if (password === ''|| password === null) {
      passowrdRef.current.focus()
      return setPasswordIsValid(true)
    }
     if (passowrdRef.current === document.activeElement) {
      telefonRef.current.focus()
    }
     if (telefon === ''|| telefon === null || telefon.length>0&&telefon.length<8  ) {
      telefonRef.current.focus()
      return setTelefonIsValid(true)
    }
    if (telefonRef.current === document.activeElement) {
      polRef.current.focus()
    }
    if (pol === 'Pol'|| pol === null) {
      polRef.current.focus()
      return setPolIsValid(true)
    }
      if (polRef.current === document.activeElement) {
      emailRef.current.focus()
    }
      if (email === ''|| email === null ) {
      emailRef.current.focus()
      return setEmailIsValid(true)
    }
      if (emailRef.current === document.activeElement) {
      jmbgRef.current.focus()
    }
     if (jmbg === ''|| jmbg === null || jmbg.length>0&&jmbg.length<14 ) {
      jmbgRef.current.focus()
      return setJmbgIsValid(true)
    }
    Axios.post("http://localhost:3001/usersDodaj", {
        ime: ime,
        prezime: prezime,
        username: username,
        password: password,
        telefon: telefon,
        pol: pol,
        email: email,
        jmbg: jmbg,
        datum: formatedDate,
        role: 'user'
      }).then((response) => {
        props.refresh();
        console.log(response);
      });
       setTimeout(async () => {
            close();
    }, 1000);
    notify();
  };

  const close = () => {
    props.closeModal(false);
    document.body.style.overflow = "visible";
  };

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
              <div className={classes.lineDisplay}>
                <input
                  ref={imeRef}
                  onChange={(e) => setIme(e.target.value)}
                  className={`${classes.input} ${imeIsValid&&(ime.trim()===null || ime.trim() === '')  ? classes.border : ''}`}
                  type="text"
                  placeholder="Ime"
                />

                <input
                  ref={prezimeRef}
                  onChange={(e) => setPrezime(e.target.value)}
                  className={`${classes.input} ${prezimeIsValid&&(prezime.trim()===null || prezime.trim() === '')  ? classes.border : ''}`}
                  type="text"
                  placeholder="Prezime"
                />
              </div>
            </div>
            <div className={classes.smallWrapper}>
              <div className={classes.lineDisplay}>
                <input
                  ref={usernameRef}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${classes.input} ${usernameIsValid&&(username.trim()===null || username.trim() === '')  ? classes.border : ''}`}
                  type="text"
                  placeholder="Korisničko ime"
                />

                <input
                  ref={passowrdRef}
                  onChange={ (e) => setPassword(e.target.value)}
                  className={`${classes.input} ${passwordIsValid&&(password.trim()===null || password.trim() === '')  ? classes.border : ''}`}
                  type="text"
                  placeholder="Lozinka"
                />
              </div>
            </div>
            <div className={`${classes.smallWrapper} ${classes.telPol}`}>
              <div className={classes.lineDisplay}>
                <input
                  ref={telefonRef}
                  onChange={(e) => setTelefon(e.target.value)}
                  className={`${classes.input} ${classes.telefon} ${telefonIsValid&&(telefon.trim()===null || telefon.trim() === '' || telefon.length>0&&telefon.length<8 )  ? classes.border : ''}`}
                  type="number"
                  placeholder="Kontakt telefon"
                />
                <select
                  ref={polRef}
                  onChange={(e) => setPol(e.target.value)}
                  className={`${classes.select} ${polsValid&&(pol.trim()===null || pol.trim() === 'Pol')  ? classes.border : ''}`}
                >
                  <option className={classes.option}>Pol</option>
                  <option className={classes.option}>M</option>
                  <option className={classes.option}>Ž</option>
                </select>
              </div>
            </div>
            <div className={classes.smallWrapper}>
              <input
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                className={`${classes.input} ${emailIsValid&&(email.trim()===null || email.trim() === '' )  ? classes.border : ''}`}
                type="text"
                placeholder="E-mail adresa"
              />
            </div>
            <div className={classes.smallWrapper}>
              <div className={classes.lineDisplay}>
                <input
                  ref={jmbgRef}
                  onChange={(e) => setJmbg(e.target.value)}
                  className={`${classes.input} ${jmbgIsValid&&(jmbg.trim()===null || jmbg.trim() === '' || jmbg.length>0&&jmbg.length<14 )  ? classes.border : ''}`}
                  type="number"
                  placeholder="JMBG"
                />

            <input
                value={formatedDate}
                onClick={showCalendarFunc}
                onChange={(e) => setDatum(e.target.value)}
                className={`${classes.input} ${classes.dateInput}`}
                type="text"
              />
            </div>
            <div ref={refCloseCalendar}>
              {showCalendar && (
                <Calendar
                  style={{ zIndex: 100000 }}
                  className={classes.Calendar}
                  onChange={(item) => setDate(item)}
                />
              )}
            </div>
              </div>

            <footer className={classes.actions}>
              <button type="submit" className={classes.button}>
                Dodaj korisnika
              </button>
              <button onClick={close} className={classes.close}>
                Otkaži
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          submitData={props.submitData}
          refresh={props.refresh}
          closeModal={props.closeModal}
          title={props.title}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
