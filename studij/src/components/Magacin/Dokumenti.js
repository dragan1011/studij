import React, { useState, useEffect } from "react";
import DokumentiTabela from "./DokumentiTabela";

import classes from "./Dokumenti.module.css";

function Statusi(props) {
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
        item.oznaka
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.napomena
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.datum_kreiranja
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };

  // fetch dokumenti
  const dataFetch = async () => {
    const data = await (
      await fetch("http://localhost:3001/dokumentiDetalji")
    ).json();

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
        <h2 className={classes.nazivCentra}>{props.centarIme}</h2>
      </div>
      <div className={classes.row_heading}>
        <div className={`${classes.heading} ${classes.half}`}>Lijek</div>
        <div className={`${classes.heading} ${classes.half}`}>Serija</div>
        <div className={`${classes.heading} ${classes.half}`}>Rok trajanja</div>
        <div className={`${classes.heading} ${classes.half}`}>
          Šifra pacijenta
        </div>
        <div className={`${classes.heading} ${classes.half}`}>
          Jedinstveni kod lijeka
        </div>
        <div className={`${classes.heading} ${classes.half}`}>Količina</div>
      </div>
      <DokumentiTabela
        studijId={props.studijId}
        refresh={refreshFunc}
        data={data}
      />
    </div>
  );
}

export default Statusi;
