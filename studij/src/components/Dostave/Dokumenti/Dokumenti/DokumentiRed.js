import React from "react";
import classes from "./DokumentiTabela.module.css";

export const Dokumenti = (props) => {
  let key = 0;
  key++;

  const openModalHandler = () => {
    const tempData = {
      id: props.id,
      oznaka: props.oznaka,
      datum: props.datum,
      id_studijskog_centra: props.id_studijskog_centra,
      napomena: props.napomena,
      id_status: props.id_status,
    };
    props.open(tempData);
  };

  return (
    <div
      className={`${classes.row} ${
        (props.id / 2) % 1 ? classes.drugiRed : classes.prviRed
      } ${Number(props.id_status) === Number(2) ? classes.red : ""}`}
      key={props.id}
      onClick={openModalHandler}
    >
      <div className={`${classes.cell} ${classes.naziv}`}>{props.oznaka}</div>
      <div className={`${classes.cell} ${classes.naziv}`}>{props.datum}</div>
      <div className={`${classes.cell} ${classes.naziv}`}>{props.napomena}</div>
      <div className={`${classes.cell} ${classes.lokacija}`}>
        {Number(props.id_status) === Number(1) ? "Aktivan" : "Neaktivan"}
      </div>
    </div>
  );
};
