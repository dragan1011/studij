import { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./CentarBiranjeModal.module.css";

import CentriTabela from "./CentriTabela";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalOverlay = (props) => {
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

    notify();
  };

  const close = () => {
    props.closeModal(false);
    document.body.style.overflow = "visible";
  };

  const centar = () => {
    props.closeModal(false);
    props.showCentar(false);
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
          <h3>Centri studija broj: {props.data.broj}</h3>
        </header>
        <div className={classes.content}>
          <form onSubmit={editData} className={classes.modalWrapper}>
            <div className={classes.smallWrapper}></div>
            <div className={classes.row_heading}>
              <div className={`${classes.heading} ${classes.half}`}>Naziv</div>
              <div className={`${classes.heading} ${classes.half}`}>Šifra</div>
            </div>

            <CentriTabela
              centarIme={props.centarIme}
              centarId={props.centarId}
              centar={centar}
              closeModal={() => {
                props.closeModal(false);
              }}
              studijId={props.data.id}
              /* refresh={refreshFunc}   */ data={props.centri}
            />
            <footer className={classes.actions}>
              <button
                onClick={() => {
                  props.closeModal(false);
                }}
                className={classes.close}
              >
                Zatvori
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
          centarId={props.centarId}
          showCentar={props.showCentar}
          centri={props.centri}
          data={props.data}
          closeModal={props.closeModal}
          title={props.title}
          centarIme={props.centarIme}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
