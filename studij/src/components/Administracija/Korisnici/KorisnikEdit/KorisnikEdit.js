import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./KorisnikEdit.module.css";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Calendar } from "react-date-range";
import { format } from "date-fns";

const ModalOverlay = (props) => {
  const [ime, setIme] = useState(props.data.ime);
  const [prezime, setPrezime] = useState(props.data.prezime);
  const [telefon, setTelefon] = useState(props.data.kontakt_telefon);
  const [pol, setPol] = useState(props.data.pol);
  const [email, setEmail] = useState(props.data.email);
  const [jmbg, setJmbg] = useState(props.data.jmbg);
  const [imeIsValid, setImeIsValid] = useState(false);
  const [prezimeIsValid, setPrezimeIsValid] = useState(false);
  const [telefonIsValid, setTelefonIsValid] = useState(false);
  const [polsValid, setPolIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [jmbgIsValid, setJmbgIsValid] = useState(false);

  const imeRef = useRef(null);
  const prezimeRef = useRef(null);
  const refCloseCalendar = useRef(null);
  const telefonRef = useRef(null);
  const polRef = useRef(null);
  const emailRef = useRef(null);
  const jmbgRef = useRef(null);

  const notify = () => {
    toast.success("Uspješno izmijenjeno!", {
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

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const editData = async (e) => {
    e.preventDefault();

    if (ime.trim() == "" || ime.trim().length == 0) {
      imeRef.current.focus();
      return setImeIsValid(true);
    }
    if (imeRef.current === document.activeElement) {
      prezimeRef.current.focus();
    }
    if (prezime === "" || prezime === null) {
      prezimeRef.current.focus();
      return setPrezimeIsValid(true);
    }
    if (prezimeRef.current === document.activeElement) {
      telefonRef.current.focus();
    }
    if (
      telefon === "" ||
      telefon === null ||
      (telefon.length > 0 && telefon.length < 8)
    ) {
      telefonRef.current.focus();
      return setTelefonIsValid(true);
    }
    if (telefonRef.current === document.activeElement) {
      polRef.current.focus();
    }
    if (pol === "Pol" || pol === null) {
      polRef.current.focus();
      return setPolIsValid(true);
    }
    if (polRef.current === document.activeElement) {
      emailRef.current.focus();
    }
    if (email === "" || email === null) {
      emailRef.current.focus();
      return setEmailIsValid(true);
    }
    if (emailRef.current === document.activeElement) {
      jmbgRef.current.focus();
    }
    if (jmbg === "" || jmbg === null || (jmbg.length > 0 && jmbg.length < 14)) {
      jmbgRef.current.focus();
      return setJmbgIsValid(true);
    }

    Axios.put("http://localhost:3001/usersUpdate", {
      id: props.data.id,
      ime: ime,
      prezime: prezime,
      telefon: telefon,
      pol: pol,
      email: email,
      jmbg: jmbg,
    });
    props.refresh();

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
      <div
        onClick={() => {
          props.closeModal(false);
        }}
        className={classes.backdrop}
      />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <form onSubmit={editData} className={classes.modalWrapper}>
            <div className={classes.smallWrapper}>
              <div className={classes.lineDisplay}>
                <input
                  ref={imeRef}
                  onChange={(e) => setIme(e.target.value)}
                  className={`${classes.input} ${
                    imeIsValid && (ime.trim() === null || ime.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                  value={ime}
                  placeholder="Ime"
                />

                <input
                  ref={prezimeRef}
                  onChange={(e) => setPrezime(e.target.value)}
                  className={`${classes.input} ${
                    prezimeIsValid &&
                    (prezime.trim() === null || prezime.trim() === "")
                      ? classes.border
                      : ""
                  } ${classes.inputRight}`}
                  value={prezime}
                  type="text"
                  placeholder="Prezime"
                />
              </div>
            </div>
            <div className={`${classes.smallWrapper} ${classes.telPol}`}>
              <div className={classes.lineDisplay}>
                <input
                  ref={telefonRef}
                  onChange={(e) => setTelefon(e.target.value)}
                  className={`${classes.input} ${classes.telefon} ${
                    telefonIsValid &&
                    (telefon.trim() === null ||
                      telefon.trim() === "" ||
                      (telefon.length > 0 && telefon.length < 8))
                      ? classes.border
                      : ""
                  }`}
                  type="number"
                  value={telefon}
                  placeholder="Kontakt telefon"
                />
                <select
                  ref={polRef}
                  onChange={(e) => setPol(e.target.value)}
                  className={`${classes.select} ${
                    polsValid && (pol.trim() === null || pol.trim() === "Pol")
                      ? classes.border
                      : ""
                  }  ${classes.inputRight}`}
                  value={pol}
                >
                  <option className={classes.option}>Pol</option>
                  <option className={classes.option}>M</option>
                  <option className={classes.option}>Ž</option>
                </select>
              </div>
            </div>
            <div className={classes.smallWrapper}>
              <div className={classes.lineDisplay}>
                <input
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${classes.input} ${
                    emailIsValid &&
                    (email.trim() === null || email.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                  value={email}
                  placeholder="E-mail adresa"
                />

                <input
                  ref={jmbgRef}
                  onChange={(e) => setJmbg(e.target.value)}
                  className={`${classes.input} ${
                    jmbgIsValid &&
                    (jmbg.trim() === null ||
                      jmbg.trim() === "" ||
                      (jmbg.length > 0 && jmbg.length < 14))
                      ? classes.border
                      : ""
                  }  ${classes.inputRight}`}
                  value={jmbg}
                  type="number"
                  placeholder="JMBG"
                />
              </div>
            </div>
            <div className={classes.smallWrapper}></div>
            <footer className={classes.actions}>
              <button type="submit" className={classes.button}>
                Sačuvaj
              </button>
              <button
                onClick={() => {
                  props.closeModal(false);
                }}
                className={classes.close}
              >
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
          data={props.data}
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
