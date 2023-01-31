import React from "react";
import classes from "./KorisniciTabela.module.css";

export const KorisniciRed = (props) => {
  const openModalHandler = () => {
    const tempData = {
      id: props.id,
      username: props.username,
      ime: props.ime,
      prezime: props.prezime,
      pol: props.pol,
      kontakt_telefon: props.kontakt_telefon,
      jmbg: props.jmbg,
      email: props.email,
    };
    props.open(tempData);
  };

  return (
    <div
      className={`${classes.row} ${
        (props.id / 2) % 1 ? classes.drugiRed : classes.prviRed
      }`}
      key={props.id}
      onClick={openModalHandler}
    >
      <div className={`${classes.cell} ${classes.naziv}`}>{props.ime}</div>
      <div className={`${classes.cell} ${classes.naziv}`}>{props.prezime}</div>
      <div className={`${classes.cell} ${classes.naziv}`}>{props.jmbg}</div>
      <div className={`${classes.cell} ${classes.naziv}`}>
        {props.kontakt_telefon}
      </div>
      <div className={`${classes.cell} ${classes.lokacija}`}>{props.email}</div>
    </div>
  );
};
