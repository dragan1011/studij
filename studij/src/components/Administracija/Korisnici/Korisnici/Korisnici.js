import React, { useState, useEffect } from "react";
import KorisniciTabela from "./KorisniciTabela";
import AddKorisnikModal from "../AddKorisnikModal/AddKorisnikModal";

import classes from "./Korisnici.module.css";

function Statusi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const modal = () => {
    setIsModal(true);
    document.body.style.overflow = "hidden";
  };

  const search = (data) => {
    return data.filter(
      (item) =>
        item.naziv
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.opis.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // fetch data
  const dataFetch = async () => {
    const data = await (await fetch("http://localhost:3001/users")).json();

    // set state when the data received
    setData(data);
  };

  useEffect(() => {
    dataFetch();
  }, [refresh]);

  const refreshFunc = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className={classes.dijeteWrapper}>
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
          Dodaj novog korisnika
        </button>
        {isModal && (
          <AddKorisnikModal
            refresh={refreshFunc}
            closeModal={setIsModal}
            title="Dodaj novog korisnika"
          />
        )}
      </div>
      <div className={classes.row_heading}>
        <div className={`${classes.heading} ${classes.half}`}>Ime</div>
        <div className={`${classes.heading} ${classes.half}`}>Prezime</div>
        <div className={`${classes.heading} ${classes.half}`}>JMBG</div>
        <div className={`${classes.heading} ${classes.half}`}>Kontakt telefon</div>
        <div className={`${classes.heading} ${classes.half}`}>
          E-mail
        </div>
      </div>
      <KorisniciTabela refresh={refreshFunc} data={data} />
    </div>
  );
}

export default Statusi;
