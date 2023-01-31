import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./AddKorisnikModal.module.css";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalOverlay = (props) => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telefon, setTelefon] = useState("");
  const [pol, setPol] = useState("");
  const [email, setEmail] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [date, setDate] = useState("");
  const [nazivIsValid, setNazivIsValid] = useState(false);
  const [opisIsValid, setOpisIsValid] = useState(false);

  const nazivRef = useRef(null);
  const opisRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    nazivRef.current.focus();
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
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

    notify();
    /*   setTimeout(async () => {
      Axios.post("http://localhost:3001/ulogaDodaj", {
        nazivUloga: ,
        opisUloga: ,
      }).then((response) => {
        props.refresh();
        console.log(response);
      });

      close();
    }, 1000); */
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
                  ref={nazivRef}
                  onChange={(e) => setIme(e.target.value)}
                  className={`${classes.input}`}
                  type="text"
                  placeholder="Ime"
                />

                <input
                  ref={nazivRef}
                  onChange={(e) => setPrezime(e.target.value)}
                  className={`${classes.input}`}
                  type="text"
                  placeholder="Prezime"
                />
              </div>
            </div>
            <div className={classes.smallWrapper}>
              <div className={classes.lineDisplay}>
                <input
                  ref={nazivRef}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${classes.input}`}
                  type="text"
                  placeholder="Korisničko ime"
                />

                <input
                  ref={nazivRef}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${classes.input}`}
                  type="text"
                  placeholder="Lozinka"
                />
              </div>
            </div>
            <div className={`${classes.smallWrapper} ${classes.telPol}`}>
              <div className={classes.lineDisplay}>
                <input
                  ref={nazivRef}
                  onChange={(e) => setTelefon(e.target.value)}
                  className={`${classes.input} ${classes.telefon}`}
                  type="text"
                  placeholder="Kontakt telefon"
                />
                <select
                  onChange={(e) => setPol(e.target.value)}
                  className={classes.select}
                >
                  <option className={classes.option}>M</option>
                  <option className={classes.option}>Ž</option>
                </select>
              </div>
            </div>
            <div className={classes.smallWrapper}>
              <input
                ref={nazivRef}
                onChange={(e) => setEmail(e.target.value)}
                className={`${classes.input}`}
                type="text"
                placeholder="E-mail adresa"
              />
            </div>
            <div className={classes.smallWrapper}>
              <div className={classes.lineDisplay}>
                <input
                  ref={nazivRef}
                  onChange={(e) => setJmbg(e.target.value)}
                  className={`${classes.input}`}
                  type="text"
                  placeholder="JMBG"
                />

                <input
                  ref={nazivRef}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${classes.input}`}
                  type="text"
                  placeholder="Datum rođenja"
                />
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
