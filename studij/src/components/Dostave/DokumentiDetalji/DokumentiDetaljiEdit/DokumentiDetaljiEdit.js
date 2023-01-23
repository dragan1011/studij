import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./DokumentiDetaljiEdit.module.css";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalOverlay = (props) => {
  const [serija, setSerija] = useState(props.data.serija);
  const [kodLijeka, setKodLijeka] = useState(props.data.jedinstveni_kod_lijeka);
  const [pacijent, setPacijent] = useState(props.data.sifra_pacijenta);
  const [datumIsValid, setDatumIsValid] = useState(false);
  const [serijaIsValid, setSerijaIsValid] = useState(false);
  const [kodLijekaIsValid, setKodLijekaIsValid] = useState(false);
  const [pacijentIsValid, setPacijentIsValid] = useState(false);

  const serijaRef = useRef(null);
  const kodLijekaRef = useRef(null);
  const lijekRef = useRef(null);
  const pacijentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    serijaRef.current.focus();
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

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

  const editData = async (e) => {
    e.preventDefault();

    if (serija.trim() === "" || serija.trim().length === 0) {
      serijaRef.current.focus();
      return setSerijaIsValid(true);
    }
    if (serijaRef.current === document.activeElement) {
      kodLijekaRef.current.focus();
    }
    if (kodLijeka.trim() === "" || kodLijeka.trim() === null) {
      kodLijekaRef.current.focus();
      return setKodLijekaIsValid(true);
    }
    if (kodLijeka.current === document.activeElement) {
      pacijentRef.current.focus();
    }
    if (pacijent.trim() === "" || pacijent.trim() === null) {
      pacijentRef.current.focus();
      return setPacijentIsValid(true);
    }

    notify();

    setTimeout(async () => {
      Axios.put("http://localhost:3001/dokumentDetaljiUpdate", {
        id: props.data.id,
        serija: serija,
        kodLijeka: kodLijeka,
        pacijent: pacijent,
      });
      props.refresh();

      close();
    }, 1000);
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
              <label className={classes.label}>Rok trajanja</label>
              <label className={classes.label}>{props.data.rok_trajanja}</label>
            </div>
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Serija</label>
              <input
                ref={serijaRef}
                defaultValue={props.data.serija}
                onChange={(e) => setSerija(e.target.value)}
                className={`${classes.input} ${
                  serijaIsValid &&
                  (serija.trim() === null || serija.trim() === "")
                    ? classes.border
                    : ""
                }`}
                type="text"
              />
            </div>
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Jedinstveni kod lijeka</label>
              <input
                ref={kodLijekaRef}
                defaultValue={props.data.jedinstveni_kod_lijeka}
                onChange={(e) => setKodLijeka(e.target.value)}
                className={`${classes.input} ${
                  kodLijekaIsValid &&
                  (kodLijeka.trim() === null || kodLijeka.trim() === "")
                    ? classes.border
                    : ""
                }`}
                type="text"
              />
            </div>
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Šifra pacijenta</label>
              <input
                ref={pacijentRef}
                defaultValue={props.data.sifra_pacijenta}
                onChange={(e) => setPacijent(e.target.value)}
                className={`${classes.input} ${
                  pacijentIsValid &&
                  (pacijent.trim() === null || pacijent.trim() === "")
                    ? classes.border
                    : ""
                }`}
                type="text"
              />
            </div>
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
