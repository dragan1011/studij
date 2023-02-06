import { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./DokumentiDetalji.module.css";

import AddDokumentModal from "../AddDokumentModal/AddDokumentModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DokumentDetaljiTabela from "./DokumentDetaljiTabela";

const ModalOverlay = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

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

  const search = (data) => {
    return data.filter(
      (item) =>
        item.datum
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.oznaka
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.napomena
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };
  const searchUserFunc = (data) => {
    return Array.from(lijek).filter((item) =>
      item.imePrezime
        .toString()
        .toLowerCase()
        .includes(searchUser.toLowerCase())
    );
  };

  // fetch data centri
  const dataFetch = async () => {
    const data = await (
      await fetch("http://localhost:3001/dokumentiIzlaz")
    ).json();

    // set state when the data received
    setData(data);
  };

  const [lijek, setLijek] = useState("");

  // fetch data korisnici
  const lijekFetch = async () => {
    const data = await (await fetch("http://localhost:3001/lijekovi")).json();

    // set state when the data received
    setLijek(data);
  };

  useEffect(() => {
    dataFetch();
    lijekFetch();
  }, [refresh]);

  const refreshFunc = () => {
    setRefresh((prev) => !prev);
  };

  const close = () => {
    props.closeModal(false);
    document.body.style.overflow = "visible";
  };

  const [centarId, setCentarId] = useState("");

  const handleData = (childData) => {
    setCentarId(childData);
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
          <h3>Oznaka dokumenta:</h3>
        </header>
 <div className={classes.background}>
        <div className={classes.components}>
          <input
            type="text"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            placeholder="Brza pretraga..."
            className={classes.search}
          />
          <button onClick={modal} className={classes.add}>
            Kreiraj dokument
          </button>
          {isModal && (
            <AddDokumentModal
              data={props.data}
              refresh={refreshFunc}
              closeModal={setIsModal}
              title="Kreiranje novog dokumenta"
            />
          )}
        </div>
        <div className={classes.row_heading}>
          <div className={`${classes.heading} ${classes.half}`}>Oznaka</div>
          <div className={`${classes.heading} ${classes.half}`}>
            Datum
          </div>
          <div className={`${classes.heading} ${classes.half}`}>Napomena</div>
          <div className={`${classes.heading} ${classes.half}`}>
            Opcije
          </div>
          
        </div>
        <DokumentDetaljiTabela
          centarId={handleData}
          dokumentData={props.data}
          refresh={refreshFunc}
          data={search(data)}
        />
</div>
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
