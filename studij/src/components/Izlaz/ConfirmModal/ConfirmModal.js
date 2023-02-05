import { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./ConfirmModal.module.css";

import Axios from "axios";

const ModalOverlay = (props) => {
  const [isModal, setIsModal] = useState(false);

  const modal = () => {
    setIsModal(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const zakljuciIzlaz = () => {
    Axios.put("http://localhost:3001/zakljuciIzlazDokumenta", {
      id_dokumenta_trebovanje: props.data.id,
      knarudzba: 1,
    }).then((response) => {
      props.refresh();
      console.log(response);
    });
    setTimeout(async () => {
      close();
    }, 1000);
    props.notifyOdbij();
  };

  const close = () => {
    props.closeModal(false);
    document.body.style.overflow = "visible";
  };

  return (
    <div>
      <div
        onClick={() => {
          props.closeModal(false);
        }}
        className={classes.backdrop}
      />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
          {<h3>{props.data.oznaka}</h3>}
        </header>
        <div className={classes.content}>
          Da li ste sigurni da želite zaključiti izlaz dokumenta?
        </div>
        <footer className={classes.actions}>
          <div className={classes.center}>
            <button onClick={zakljuciIzlaz} className={classes.button}>
              Zaključi izlaz
            </button>
            <button
              onClick={() => {
                props.closeModal(false);
              }}
              className={classes.close}
            >
              Zatvori
            </button>
          </div>
        </footer>
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
          notifyOdbij={props.notifyOdbij}
          notify={props.notify}
          refresh={props.refresh}
          data={props.data}
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
