import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./DokumentiEdit.module.css";

import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalOverlay = (props) => {
  const [oznaka, setOznaka] = useState(props.data.oznaka);
  const [napomena, setNapomena] = useState(props.data.napomena);
  const [oznakaIsValid, setOznakaIsValid] = useState(false);
  const [napomenaIsValid, setNapomenaIsValid] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    Number(props.data.id_status) === Number(1) ? "Aktivan" : "Neaktivan"
  );
  const [focusedOption, setFocusedOption] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(
    Number(props.data.id_status) === Number(1) ? "1" : "2"
  );

  const oznakaRef = useRef(null);
  const napomenaRef = useRef(null);
  const refCloseCalendar = useRef(null);

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

  const editData = async (e) => {
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
    notify();

    setTimeout(async () => {
      Axios.put("http://localhost:3001/dokumentUpdate", {
        id: props.data.id,
        oznaka: oznaka,
        napomena: napomena,
        id_statusa: selectedOptionId,
      });
      props.refresh();

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
      <div
        onClick={() => {
          props.closeModal(false);
        }}
        className={classes.backdrop}
      />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <form onSubmit={editData} className={classes.modalWrapper}>
            <div className={classes.smallWrapper}>
              <label className={classes.label}>Oznaka</label>
              <input
                value={oznaka}
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
                value={napomena}
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

            <div className={classes.smallWrapper}>
              <label className={classes.label}>Status</label>
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
