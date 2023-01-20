import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import classes from "./AddDokumentiDetaljiModal.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Calendar } from "react-date-range";
import { format } from "date-fns";

const ModalOverlay = (props) => {
  const [datum, setDatum] = useState("");
  const [oznaka, setOznaka] = useState("");
  const [napomena, setNapomena] = useState("");
  const [datumIsValid, setDatumIsValid] = useState(false);
  const [oznakaIsValid, setOznakaIsValid] = useState(false);
  const [napomenaIsValid, setNapomenaIsValid] = useState(false);
  const [date, setDate] = useState(new Date());
  let formatedDate = format(date, "yyyy-MM-dd");
  const [showCalendar, setShowCalendar] = useState(false);
  const [statusIsValid, setStatusIsValid] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  const [focusedOption, setFocusedOption] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");

  const datumRef = useRef(null);
  const oznakaRef = useRef(null);
  const napomenaRef = useRef(null);
  const statusRef = useRef(null);
  const refCloseCalendar = useRef(null);

  const data = [
    { id: 1, naziv: "Aktivan" },
    { id: 2, naziv: "Neaktivan" },
  ];

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const notify = () => {
    toast.success("Dokument je uspješno dodan!", {
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

  const addNewData = async (e) => {
    e.preventDefault();

    if (oznaka.trim() == "" || oznaka.trim().length == 0) {
      oznakaRef.current.focus();
      return setOznakaIsValid(true);
    }
    if (oznakaRef.current === document.activeElement) {
      napomenaRef.current.focus();
    }
    if (napomena === "" || napomena === null) {
      napomenaRef.current.focus();
      return setNapomenaIsValid(true);
    }
    if (napomenaRef.current === document.activeElement) {
      setShowList(true);
      statusRef.current.focus();
    }
    if (selectedOption === "" || selectedOption === null) {
      statusRef.current.focus();
      setShowList(true);
      return setStatusIsValid(true);
    }

    notify();
    Axios.post("http://localhost:3001/dokumentDodaj", {
      vrsta: "ulaz",
      datum: formatedDate,
      oznaka: oznaka,
      id_studijskog_centra: props.studijId,
      broj_dostavnice: 0,
      id_veze: 0,
      storno: 0,
      napomena: napomena,
      id_statusa: selectedOptionId,
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
  const showCalendarFunc = () => {
    setShowCalendar((prevState) => !prevState);
  };
  const hideOnClickOutside = (e) => {
    if (
      refCloseCalendar.current &&
      !refCloseCalendar.current.contains(e.target)
    ) {
      setShowCalendar(false);
    }
  };

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
  };
  return (
    <div>
      <ToastContainer />
      <div onClick={close} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <form onSubmit={addNewData} className={classes.modalWrapper}>
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Datum</label>
              <input
                value={formatedDate}
                onClick={showCalendarFunc}
                onChange={(e) => setDatum(e.target.value)}
                className={`${classes.input} ${classes.dateInput}`}
                type="text"
              />
            </div>
            <div ref={refCloseCalendar}>
              {showCalendar && (
                <Calendar
                  style={{ zIndex: 100000 }}
                  className={classes.Calendar}
                  onChange={(item) => setDate(item)}
                />
              )}
            </div>
              <div className={classes.smallWrapper}>
              <label className={classes.label}>Status</label>
              <input
                className={`${classes.input}  ${
                  statusIsValid &&
                  (selectedOption.trim() === null ||
                    selectedOption.trim() === "")
                    ? classes.border
                    : ""
                }`}
                type="text"
                value={selectedOption}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={showListFunc}
                ref={statusRef}
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
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Oznaka</label>
              <input
                ref={oznakaRef}
                onChange={(e) => setOznaka(e.target.value)}
                className={`${classes.input} ${
                  oznakaIsValid &&
                  (oznaka.trim() === null || oznaka.trim() === "")
                    ? classes.border
                    : ""
                }`}
                type="text"
              />
            </div>
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Napomena</label>
              <input
                ref={napomenaRef}
                onChange={(e) => setNapomena(e.target.value)}
                className={`${classes.input} ${
                  napomenaIsValid &&
                  (napomena.trim() === null || napomena.trim() === "")
                    ? classes.border
                    : ""
                }`}
                type="text"
              />
            </div>

            <footer className={classes.actions}>
              <button type="submit" className={classes.button}>
                Dodaj seriju
              </button>
              <button onClick={close} className={classes.close}>
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
