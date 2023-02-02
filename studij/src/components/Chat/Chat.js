import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import classes from "./Chat.module.css";

const ModalOverlay = (props) => {
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "" || message.trim().length === 0) {
      return;
    }

    Axios.post("http://localhost:3001/porukaDodaj", {
      id_korisnika: props.userData.user[0].id,
      poruka: message.trim(),
    }).then((response) => {
      props.refresh((prevState) => !prevState);
      setMessage("");
    });

    setTimeout(() => {
      scrollToBottom();
    }, 100);
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
          <div
            ref={containerRef}
            style={{ overflowY: "scroll", height: "15rem" }}
            className={classes.messageWindow}
          >
            {props.data.map((item) => {
              return (
                <div
                  className={`${classes.message} ${
                    Number(item.id_korisnika) ===
                    Number(props.userData.user[0].id)
                      ? classes.right
                      : ""
                  }`}
                  key={item.id}
                >
                  <div>{item.poruka} </div>
                  <div>
                    {Number(item.id_korisnika) ===
                    Number(props.userData.user[0].id)
                      ? ""
                      : props.users.map((korisnik) => (
                          <div className={classes.useraname}>
                            {Number(korisnik.id) === Number(item.id_korisnika)
                              ? korisnik.ime + " " + korisnik.prezime + " "
                              : ""}
                            {Number(korisnik.id) === Number(item.id_korisnika)
                              ? " " + item.vrijeme.slice(11, 19)
                              : ""}
                          </div>
                        ))}
                  </div>
                </div>
              );
            })}
          </div>

          <form className={classes.messageWraper} onSubmit={sendMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={classes.input}
              placeholder="Vaša poruka..."
            />{" "}
            <button type="submit" className={classes.button}>
              <img src="utilities/direct.png" />
            </button>
          </form>
        </div>
        <footer className={classes.actions}>
          <button onClick={close} className={classes.close}>
            Otkaži
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
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
