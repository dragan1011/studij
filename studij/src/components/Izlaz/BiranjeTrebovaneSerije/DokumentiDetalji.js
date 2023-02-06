import { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./DokumentiDetalji.module.css";

import DokumentiDetalji from "./AddDokumentiDetaljiModal/Serije/DokumentiDetalji";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DokumentDetaljiTabela from "./DokumentDetaljiTabela";

import Axios from 'axios'

const ModalOverlay = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
   const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledDelete, setIsDisabledDelete] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);


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


  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsDisabled(selectedIds.length === 0);
      setIsDisabledDelete(selectedIds.length === 0);
    } else if (selectedIds.length === 1) {
      setIsDisabled(selectedIds.length <= 0);
      setIsDisabledDelete(selectedIds.length <= 0);
    } else if (selectedIds.length === 2) {
      setIsDisabled(selectedIds.length !== 1);
    }
  }, [selectedIds]);

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
        item.serija
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.rok_trajanja
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.jedinstveni_kod_lijeka
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
      await fetch("http://localhost:3001/dokumentiDetalji")
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

   const ukloniSeriju = async (e) => {
    e.preventDefault();

    for (let i = 0; i < selectedIds.length; i++) {

      Axios.put("http://localhost:3001/dokumentDetaljiIzlazIzbaci", {
        id: selectedIds[i],
        knarudzba: 0,
        id_dokumenta_izlaz: ''
      }).then((response) => {
        refreshFunc();
        console.log(response);
      });
    }
    setSelectedIds([])
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
          <h3>Oznaka dokumenta: {props.data.oznaka}</h3>
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
            {Number(props.data.id_statusa) === Number(1) && (
              <button disabled={selectedIds.length >= 1 ? false : true} onClick={ukloniSeriju} className={`${classes.ukloniSeriju} ${
              selectedIds.length === 0 ? classes.buttonDisabled : ""
            }`}>
                Ukloni seriju
              </button>
            )}
            {( Number(props.data.id_statusa) === 1 ? 
              <button onClick={modal} className={classes.add}>
                Biranje serije
              </button> : ''
            )}
            {isModal && (
              <DokumentiDetalji
                data={props.data}
                refresh={refreshFunc}
                closeModal={setIsModal}
                title="Biranje serije"
                studijId={props.studijId}
                trebovanjeData={props.trebovanjeData}
              />
            )}
          </div>
          <div className={classes.row_heading}>
            <div className={`${classes.heading} ${classes.half}`}>Lijek</div>
            <div className={`${classes.heading} ${classes.half}`}>
              Rok trajanja
            </div>
            <div className={`${classes.heading} ${classes.half}`}>Serija</div>
            <div className={`${classes.heading} ${classes.half}`}>
              Jedinstveni kod lijeka
            </div>
            <div className={`${classes.heading} ${classes.half}`}>Pacijent</div>
          </div>
          <DokumentDetaljiTabela
             selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            centarId={handleData}
            dokumentData={props.data}
            refresh={refreshFunc}
            data={search(data)}
            lijek={lijek}
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
          studijId={props.studijId}
          trebovanjeData={props.trebovanjeData}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
