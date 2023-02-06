import { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./InfoModal.module.css";

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

  console.log(props.rowData)

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
          {<h3></h3>}
        </header>
        <div className={classes.content}>
          <div className={classes.row}>
            Ulazni datum:
            {props.dokumenti.map((item) => {
              return Number(item.id) === Number(props.rowData.id_dokumenta)
                ? " " + item.datum_kreiranja.slice(0, 10)
                : "";
            })}
          </div>
          <div className={classes.row}>
            Trebovani datum:
            {props.trebovanje.map((item) => {
              return Number(item.id) ===
                Number(props.rowData.id_dokumenta_trebovanje)
                ? " " + item.datum_kreiranja.slice(0, 10)
                : "";
            })}
          </div>
          <div className={classes.row}>Izlazni datum: {props.trebovanje.map((item) => {
              return Number(item.id) ===
                Number(props.rowData.id_dokumenta_izlaz)
                ? " " + item.datum_kreiranja.slice(0, 10)
                : "";
            })}</div>
        </div>
        <footer className={classes.actions}>
          <div className={classes.center}>
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
          refresh={props.refresh}
          data={props.data}
          closeModal={props.closeModal}
          title={props.title}
          rowData={props.rowData}
          trebovanje={props.trebovanje}
          dokumenti={props.dokumenti}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
