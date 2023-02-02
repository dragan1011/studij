import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import classes from "./Chat.module.css";

const ModalOverlay = (props) => {
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const addNewData = async (e) => {
    e.preventDefault();

    /* Axios.post("http://localhost:3001/dokumentDodaj", {
     
    }).then((response) => {
      props.refresh();
      console.log(response);
    });
 */
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
      <div onClick={close} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <footer className={classes.actions}>
            <button type="submit" className={classes.button}>
              Dodaj dokument
            </button>
            <button onClick={close} className={classes.close}>
              Otkaži
            </button>
          </footer>
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
          studijId={props.studijId}
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
