import { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import classes from "./AddDokumentiDetaljiModal.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Calendar } from "react-date-range";
import { format } from "date-fns";

import TabButton from "../../../UI/TabButton/TabButton";

const ModalOverlay = (props) => {
  const [active, setActive] = useState("jednaSerija");

  const [datum, setDatum] = useState("");
  const [serija, setSerija] = useState("");
  const [kodLijeka, setKodLijeka] = useState("");
  const [pacijent, setPacijent] = useState("");
  const [datumIsValid, setDatumIsValid] = useState(false);
  const [serijaIsValid, setSerijaIsValid] = useState(false);
  const [kodLijekaIsValid, setKodLijekaIsValid] = useState(false);
  const [pacijentIsValid, setPacijentIsValid] = useState(false);
  const [date, setDate] = useState(new Date());
  let formatedDate = format(date, "yyyy-MM-dd");
  const [showCalendar, setShowCalendar] = useState(false);
  const [lijekIsValid, setLijekIsValid] = useState(false);
  const [data, setData] = useState([]);

  const [pocetnaSerija, setPocetnaSerija] = useState("");
  const [krajnjaSerija, setKrajnjaSerija] = useState("");
  const [korakSerije, setKorakSerije] = useState("");
  const [nazivSerije, setNazivSerije] = useState("");

  const [pocetnaSerijaIsValid, setPocetnaSerijaIsValid] = useState(false);
  const [krajnjaSerijaIsValid, setKrajnjaSerijaIsValid] = useState(false);
  const [korakSerijaIsValid, setKorakSerijaIsValid] = useState(false);
  const [nazivSerijaIsValid, setNazivSerijaIsValid] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  const [focusedOption, setFocusedOption] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");

  const datumRef = useRef(null);
  const serijaRef = useRef(null);
  const kodLijekaRef = useRef(null);
  const lijekRef = useRef(null);
  const pacijentRef = useRef(null);
  const refCloseCalendar = useRef(null);

  const pocetnaSerijaRef = useRef(null);
  const krajnjaSerijaRef = useRef(null);
  const korakSerijaRef = useRef(null);
  const nazivSerijeRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    dataFetch();
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const dataFetch = async () => {
    const data = await (await fetch("http://localhost:3001/lijekovi")).json();

    // set state when the data received
    setData(data);
  };
  const notify = () => {
    toast.success("Serija je uspješno dodana!", {
      position: "top-right",
      autoClose: 1500,
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

    if (selectedOption === "" || selectedOption === null) {
      lijekRef.current.focus();
      setShowList(true);
      return setKodLijekaIsValid(true);
    }
    if (lijekRef.current === document.activeElement) {
      serijaRef.current.focus();
      setShowList(false);
    }
    if (serija.trim() === "" || serija.trim().length === 0) {
      serijaRef.current.focus();
      return setSerijaIsValid(true);
    }
    if (serijaRef.current === document.activeElement) {
      kodLijekaRef.current.focus();
    }
    if (kodLijeka.trim() === "" || kodLijeka.trim() === null) {
      kodLijekaRef.current.focus();
      return setKodLijekaIsValid(true);
    }
    if (kodLijeka.current === document.activeElement) {
      pacijentRef.current.focus();
    }
    if (pacijent.trim() === "" || pacijent.trim() === null) {
      pacijentRef.current.focus();
      return setPacijentIsValid(true);
    }

    notify();
    Axios.post("http://localhost:3001/dokumentDetaljiDodaj", {
      id_dokumenta: props.data.id,
      id_lijeka: selectedOptionId,
      serja: serija,
      rok_trajanja: formatedDate,
      jk_lijeka: kodLijeka,
      kizlaz: 0,
      kulaz: 1,
      knarudzba: 0,
      sifra_pacijenta: pacijent,
      id_studijskog_centra: props.studijId,
    }).then((response) => {
      props.refresh();
      console.log(response);
    });

    setTimeout(async () => {
      close();
    }, 1000);
  };

  const addNewMultipleData = async (e) => {
    e.preventDefault();

    if (selectedOption === "" || selectedOption === null) {
      lijekRef.current.focus();
      setShowList(true);
      return setKodLijekaIsValid(true);
    }
    if (lijekRef.current === document.activeElement) {
      nazivSerijeRef.current.focus();
      setShowList(false);
    }
    if (nazivSerije.trim() === "" || nazivSerije.trim().length === 0) {
      nazivSerijeRef.current.focus();
      return setNazivSerijaIsValid(true);
    }
    if (nazivSerijeRef.current === document.activeElement) {
      pocetnaSerijaRef.current.focus();
    }
    if (pocetnaSerija.trim() === "" || pocetnaSerija.trim().length === 0) {
      pocetnaSerijaRef.current.focus();
      return setPocetnaSerijaIsValid(true);
    }
    if (pocetnaSerijaRef.current === document.activeElement) {
      krajnjaSerijaRef.current.focus();
    }
    if (krajnjaSerija.trim() === "" || krajnjaSerija.trim().length === 0) {
      krajnjaSerijaRef.current.focus();
      return setKrajnjaSerijaIsValid(true);
    }
    if (krajnjaSerijaRef.current === document.activeElement) {
      korakSerijaRef.current.focus();
    }
    if (korakSerije.trim() === "" || korakSerije.trim().length === 0) {
      korakSerijaRef.current.focus();
      return setKorakSerijaIsValid(true);
    }
    if (korakSerijaRef.current === document.activeElement) {
      kodLijekaRef.current.focus();
    }
    if (kodLijeka.trim() === "" || kodLijeka.trim() === null) {
      kodLijekaRef.current.focus();
      return setKodLijekaIsValid(true);
    }
    if (kodLijeka.current === document.activeElement) {
      pacijentRef.current.focus();
    }
    if (pacijent.trim() === "" || pacijent.trim() === null) {
      pacijentRef.current.focus();
      return setPacijentIsValid(true);
    }

    let pocetak = Number(pocetnaSerija)
    let kraj = Number(krajnjaSerija)
    let korak = Number(korakSerije)

    for (let i = pocetak; i <= kraj; i+=korak) {
      let serijaIme = nazivSerije + i;

       Axios.post("http://localhost:3001/dokumentiDetaljiDodaj", {
        id_dokumenta: props.data.id,
        id_lijeka: selectedOptionId,
        serja: serijaIme,
        rok_trajanja: formatedDate,
        jk_lijeka: kodLijeka,
        kizlaz: 0,
        kulaz: 1,
        knarudzba: 0,
        sifra_pacijenta: pacijent,
        id_studijskog_centra: props.studijId,
      }).then((response) => {
        props.refresh();
        console.log(response);
      });
    }
    notify();
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

  //Promjena tabova
  const setSelectedHandler = (name) => {
    setActive(name);
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
          <TabButton
            name={"jednaSerija"}
            activ={active}
            select={setSelectedHandler}
          >
            Korisnici
          </TabButton>
          <TabButton
            name={"viseSerija"}
            activ={active}
            select={setSelectedHandler}
          >
            {props.title}
          </TabButton>
        </header>
        {active === "jednaSerija" && (
          <div className={classes.content}>
            <form onSubmit={addNewData} className={classes.modalWrapper}>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Rok trajanja</label>
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
                <label className={classes.label}>Lijek</label>
                <input
                  className={`${classes.input}  ${
                    lijekIsValid &&
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
                  ref={lijekRef}
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
                        {Number(option.studij_id) === Number(props.studijId)
                          ? option.naziv
                          : ""}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Serija</label>
                <input
                  ref={serijaRef}
                  onChange={(e) => setSerija(e.target.value)}
                  className={`${classes.input} ${
                    serijaIsValid &&
                    (serija.trim() === null || serija.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Jedinstveni kod lijeka</label>
                <input
                  ref={kodLijekaRef}
                  onChange={(e) => setKodLijeka(e.target.value)}
                  className={`${classes.input} ${
                    kodLijekaIsValid &&
                    (kodLijeka.trim() === null || kodLijeka.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Šifra pacijenta</label>
                <input
                  ref={pacijentRef}
                  onChange={(e) => setPacijent(e.target.value)}
                  className={`${classes.input} ${
                    pacijentIsValid &&
                    (pacijent.trim() === null || pacijent.trim() === "")
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
        )}
        {active === "viseSerija" && (
          <div className={classes.content}>
            <form
              onSubmit={addNewMultipleData}
              className={classes.modalWrapper}
            >
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Rok trajanja</label>
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
                <label className={classes.label}>Lijek</label>
                <input
                  className={`${classes.input}  ${
                    lijekIsValid &&
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
                  ref={lijekRef}
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
                        {Number(option.studij_id) === Number(props.studijId)
                          ? option.naziv
                          : ""}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Naziv serije</label>
                <input
                  ref={nazivSerijeRef}
                  onChange={(e) => setNazivSerije(e.target.value)}
                  className={`${classes.input} ${
                    nazivSerijaIsValid &&
                    (nazivSerije.trim() === null || nazivSerije.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Početna serija</label>
                <input
                  ref={pocetnaSerijaRef}
                  onChange={(e) => setPocetnaSerija(e.target.value)}
                  className={`${classes.input} ${
                    pocetnaSerijaIsValid &&
                    (pocetnaSerija.trim() === null ||
                      pocetnaSerija.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Zadnja serija</label>
                <input
                  ref={krajnjaSerijaRef}
                  onChange={(e) => setKrajnjaSerija(e.target.value)}
                  className={`${classes.input} ${
                    krajnjaSerijaIsValid &&
                    (krajnjaSerija.trim() === null ||
                      krajnjaSerija.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Korak serije</label>
                <input
                  ref={korakSerijaRef}
                  onChange={(e) => setKorakSerije(e.target.value)}
                  className={`${classes.input} ${
                    korakSerijaIsValid &&
                    (korakSerije.trim() === null || korakSerije.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Jedinstveni kod lijeka</label>
                <input
                  ref={kodLijekaRef}
                  onChange={(e) => setKodLijeka(e.target.value)}
                  className={`${classes.input} ${
                    kodLijekaIsValid &&
                    (kodLijeka.trim() === null || kodLijeka.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className={classes.smallWrapper}>
                <label className={classes.label}>Šifra pacijenta</label>
                <input
                  ref={pacijentRef}
                  onChange={(e) => setPacijent(e.target.value)}
                  className={`${classes.input} ${
                    pacijentIsValid &&
                    (pacijent.trim() === null || pacijent.trim() === "")
                      ? classes.border
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <footer className={classes.actions}>
                <button type="submit" className={classes.button}>
                  Dodaj serije
                </button>
                <button onClick={close} className={classes.close}>
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
          studijId={props.studijId}
          submitData={props.submitData}
          refresh={props.refresh}
          closeModal={props.closeModal}
          title={props.title}
          data={props.data}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
