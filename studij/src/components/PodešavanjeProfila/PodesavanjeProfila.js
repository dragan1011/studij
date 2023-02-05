import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import classes from "./PodesavanjeProfila.module.css";

const ModalOverlay = (props) => {
  const [ime, setIme] = useState();
  const [prezime, setPrezime] = useState("");
  const [novaLozinka, setNovaLozinka] = useState("");
  const [potvrdaNoveLozinke, setPotvrdaNoveLozinke] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    props.users.map((item) => {
      return Number(item.id) === Number(props.userData.user.id)
        ? setIme(item.ime)
        : "";
    });
    props.users.map((item) => {
      return Number(item.id) === Number(props.userData.user.id)
        ? setPrezime(item.prezime)
        : "";
    });
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const save = (e) => {
    e.preventDefault();
    if (ime.trim().length === "" || ime.trim().length === 0) {
      return;
    }
    if (prezime.trim().length === "" || prezime.trim().length === 0) {
      return;
    }

    if (novaLozinka.trim().length === 0) {
      Axios.put("http://localhost:3001/updateUserData", {
        id_korisnika: props.userData.user.id,
        ime: ime,
        prezime: prezime,
      }).then((response) => {
        console.log(response);
        props.notify();
        setTimeout(() => {
          close();
        }, 1000);
      });
    } else {
      if (novaLozinka.trim() === "" || novaLozinka.trim().length === 0) {
        return;
      }
      if (
        potvrdaNoveLozinke.trim() === "" ||
        potvrdaNoveLozinke.trim().length === 0
      ) {
        return;
      }
      if (novaLozinka !== potvrdaNoveLozinke) {
        return console.log("nisu jednake");
      }

      Axios.put("http://localhost:3001/updateUserPassword", {
        id_korisnika: props.userData.user.id,
        newPassword: novaLozinka,
      }).then((response) => {
        console.log(response);
        props.notify();
        setTimeout(() => {
          close();
        }, 1000);
      });
    }
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
          <input
            className={classes.input}
            onChange={(e) => {
              setIme(e.target.value);
            }}
            defaultValue={ime}
            placeholder={"Ime"}
          />
          <input
            className={classes.input}
            onChange={(e) => setPrezime(e.target.value)}
            defaultValue={prezime}
            placeholder={"Prezime"}
          />
          <input
            className={classes.input}
            onChange={(e) => setNovaLozinka(e.target.value)}
            defaultValue={novaLozinka}
            placeholder={"Nova lozinka"}
            type={"password"}
          />
          <input
            className={classes.input}
            onChange={(e) => setPotvrdaNoveLozinke(e.target.value)}
            defaultValue={potvrdaNoveLozinke}
            placeholder={"Potvrda nove lozinke"}
            type={"password"}
          />
        </div>
        <footer className={classes.actions}>
          <button onClick={save} className={classes.button}>
            Sačuvaj
          </button>
          <button onClick={close} className={classes.close}>
            Zatvori
          </button>
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
          users={props.users}
          closeModal={props.closeModal}
          userData={props.userData}
          title={props.title}
          data={props.data}
          refresh={props.refresh}
          notify={props.notify}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
