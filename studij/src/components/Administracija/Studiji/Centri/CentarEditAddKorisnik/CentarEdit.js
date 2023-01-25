import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./CentarEdit.module.css";
import TabButton from "../../../../UI/TabButton/TabButton";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const ModalOverlay = (props) => {
  const [active, setActive] = useState("Izmjena");
  const [data, setData] = useState([]);

  // fetch data
  const statuFetch = async () => {
    const data = await (await fetch("http://localhost:3001/uloga")).json();

    // set state when the data received
    setData(data);
  };

  useEffect(() => {
    statuFetch();
  }, []);

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

  const notifyAdd = () => {
    toast.success("Korisnik je uspješno dodan!", {
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

  const [kolicinaIsValid, setKolicinaIsValid] = useState(false);
  const [namirnicaIsValid, setNamirnicaIsValid] = useState(false);
  const [korisnik, setKorisnik] = useState("");
  const [uloga, setUloga] = useState("");
  const [value, setValue] = useState([null, null]);
  const [status, setStatus] = useState("");

  const statusKorisnika = [
    { id: 1, naziv: "Aktivan" },
    { id: 2, naziv: "Neaktivan" },
  ];

  //Dodavanje korisnika
  const addNewKorisnik = async (e) => {
    e.preventDefault();

    let datumOd = `${value[0].$y}-${value[0].$M + 1}-${value[0].$D}`;
    let datumDo = `${value[1].$y}-${value[1].$M + 1}-${value[1].$D}`;

    if (korisnik === "" || korisnik === null) {
      return setNamirnicaIsValid(true);
    }
    if (selectedOption.trim() == "" || selectedOption.trim().length == 0) {
      return setKolicinaIsValid(true);
    }
    if (selectedStatus.trim() == "" || selectedStatus.trim().length == 0) {
      return setKolicinaIsValid(true);
    }

    notifyAdd();

    Axios.post("http://localhost:3001/korisnikDodaj", {
      imePrezime: korisnik,
      id_centra: props.data.id,
      id_uloga: selectedOptionId,
      datumOd: datumOd,
      datumDo: datumDo,
      aktivno: selectedStatusId,
    }).then((response) => {
      props.refresh();
      console.log(response);
    });

    close();
  };

  //Dropdown list choice
  const [selectedOption, setSelectedOption] = useState("");
  const [focusedOption, setFocusedOption] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      // Move focus to next option
      const currentIndex = data.indexOf(focusedOption);
      if (currentIndex < data.length - 1) {
        setFocusedOption(data[currentIndex + 1]);
      }
    } else if (event.key === "ArrowUp") {
      // Move focus to previous option
      const currentIndex = data.indexOf(focusedOption);
      if (currentIndex > 0) {
        setFocusedOption(data[currentIndex - 1]);
      }
    } else if (event.key === "Enter") {
      setSelectedOption(focusedOption.naziv);
      setSelectedOptionId(focusedOption.id);
      setShowList(false);
    }
  };

  const showListFunc = () => {
    setShowList(!showList);
    setShowStatus(false);
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [focusedStatus, setFocusedStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState("");

  const handleChangeOption = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "ArrowDown") {
      // Move focus to next option
      const currentIndex = statusKorisnika.indexOf(focusedStatus);
      if (currentIndex < statusKorisnika.length - 1) {
        setFocusedStatus(statusKorisnika[currentIndex + 1]);
      }
    } else if (event.key === "ArrowUp") {
      // Move focus to previous option
      const currentIndex = statusKorisnika.indexOf(focusedStatus);
      if (currentIndex > 0) {
        setFocusedStatus(statusKorisnika[currentIndex - 1]);
      }
    } else if (event.key === "Enter") {
      setSelectedStatus(focusedStatus.naziv);
      setSelectedStatusId(focusedStatus.id);
      setShowStatus(false);
    }
  };

  const showStatusFunc = () => {
    setShowStatus(!showStatus);
    setShowList(false);
  };

  //Promjena tabova
  const setSelectedHandler = (name) => {
    setActive(name);
  };

  const [naziv, setNaziv] = useState(props.data.naziv);
  const [sifra, setSifra] = useState(props.data.sifra);
  const [nazivIsValid, setNazivIsValid] = useState(false);
  const [sifraIsValid, setSifraIsValid] = useState(false);

  const nazivRef = useRef(null);
  const sifraRef = useRef(null);

  //Izmjena podataka o centru
  const editData = async (e) => {
    e.preventDefault();

    if (naziv.trim() === "" || naziv.trim() === null) {
      return setNazivIsValid(true);
    }
    if (sifra.trim() === "" || sifra.trim() === null) {
      return setSifraIsValid(true);
    }

    notify();
    setTimeout(async () => {
      Axios.put("http://localhost:3001/centarUpdate", {
        id: props.data.id,
        nazivCentar: naziv,
        sifraCentar: sifra,
      });
      close();
      props.refresh();
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
          <TabButton
            name={"Izmjena"}
            activ={active}
            select={setSelectedHandler}
          >
            Korisnici
          </TabButton>
          <TabButton name={"Recept"} activ={active} select={setSelectedHandler}>
            {props.title}
          </TabButton>
        </header>
        {active === "Izmjena" && (
          <div className={classes.content}>
            <form onSubmit={addNewKorisnik} className={classes.modalWrapper}>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Ime i prezime</label>
                <input
                  onChange={(e) => setKorisnik(e.target.value)}
                  className={classes.input}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Uloga</label>
                <input
                  className={classes.input}
                  type="text"
                  value={selectedOption}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onClick={showListFunc}
                />
                {showList && (
                  <div
                    className={classes.options}
                    style={{ display: "block" }}
                    onMouseDown={(event) => {
                      // Show options list
                    }}
                  >
                    {data.map((option) => (
                      <div
                        key={option.id}
                        style={{
                          backgroundColor:
                            option === focusedOption ? "#eee" : "white",
                        }}
                        onMouseDown={(event) => {
                          setSelectedOption(option.naziv);
                          setSelectedOptionId(option.id);
                          setShowList(false);
                        }}
                        onMouseEnter={(event) => {
                          setFocusedOption(option);
                        }}
                        className={classes.optionSelect}
                      >
                        {option.naziv}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  label="Advanced keyboard"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(startProps, endProps) => (
                    <>
                      <Box sx={{ mx: 1 }}> Do </Box>
                      <input
                        className={classes.input}
                        onChange={startProps.inputRef}
                        {...startProps.inputProps}
                      />
                      <Box sx={{ mx: 1 }}> do </Box>
                      <input
                        className={classes.input}
                        onChange={endProps.inputRef}
                        {...endProps.inputProps}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Status</label>
                <input
                  className={classes.input}
                  type="text"
                  value={selectedStatus}
                  onChange={handleChangeOption}
                  onKeyDown={handleKey}
                  onClick={showStatusFunc}
                />
                {showStatus && (
                  <div
                    className={classes.options}
                    style={{ display: "block" }}
                    onMouseDown={(event) => {
                      // Show options list
                    }}
                  >
                    {statusKorisnika.map((option) => (
                      <div
                        key={option.id}
                        style={{
                          backgroundColor:
                            option === focusedStatus ? "#eee" : "white",
                        }}
                        onMouseDown={(event) => {
                          setSelectedStatus(option.naziv);
                          setSelectedStatusId(option.id);
                          setShowStatus(false);
                        }}
                        onMouseEnter={(event) => {
                          setFocusedStatus(option);
                        }}
                        className={classes.optionSelect}
                      >
                        {option.naziv}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <footer className={classes.actions}>
                <button type="submit" className={classes.button}>
                  Dodaj
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
        )}
        {active === "Recept" && (
          <div className={classes.content}>
            <form onSubmit={editData} className={classes.modalWrapper}>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Naziv centra</label>
                <input
                  ref={nazivRef}
                  onChange={(e) => setNaziv(e.target.value)}
                  defaultValue={props.data.naziv}
                  className={`${classes.input} ${
                    nazivIsValid &&
                    (naziv.trim() === null || naziv.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Šifra centra</label>
                <input
                  ref={sifraRef}
                  onChange={(e) => setSifra(e.target.value)}
                  defaultValue={props.data.sifra}
                  className={`${classes.input} ${
                    sifraIsValid &&
                    (sifra.trim() === null || sifra.trim() === "")
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
        )}
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
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
