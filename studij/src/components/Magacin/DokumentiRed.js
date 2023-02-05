import React from "react";
import classes from "./DokumentiTabela.module.css";

export const Dokumenti = (props) => {
  let key = 0;
  key++;

  const openModalHandler = () => {
    const tempData = {
      id: props.id,
      id_lijeka: props.id_lijeka,
      serija: props.serija,
      rok_trajanja: props.rok_trajanja,
      sifra_pacijenta: props.sifra_pacijenta,
      kizlaz: props.kizlaz,
      kulaz: props.kulaz,
      knarudzba: props.knarudzba,
      jedinstveni_kod_lijeka: props.jedinstveni_kod_lijeka,
      id_dokumenta_trebovanje: props.id_dokumenta_trebovanje,
      id_dokumenta: props.id_dokumenta,
    };
    props.open(tempData);
  };

  return (
    <div
      onClick={openModalHandler}
      className={`${classes.row} ${
        (props.id / 2) % 1 ? classes.drugiRed : classes.prviRed
      } ${
        Number(props.id_status) === Number(2)
          ? classes.red
          : Number(props.id_status) === Number(3)
          ? classes.karantin
          : ""
      }`}
      key={props.id}
    >
      <div className={`${classes.cell} ${classes.naziv}`}>
        {props.id_lijeka}
      </div>
      <div className={`${classes.cell} ${classes.naziv}`}>{props.serija}</div>
      <div className={`${classes.cell} ${classes.naziv}`}>
        {props.rok_trajanja}
      </div>
      <div className={`${classes.cell} ${classes.naziv}`}>
        {props.sifra_pacijenta}
      </div>
      <div className={`${classes.cell} ${classes.naziv}`}>
        {props.jedinstveni_kod_lijeka}
      </div>
      <div className={`${classes.cell} ${classes.lokacija} ${classes.izmjena}`}>
        {Number(props.knarudzba) === 1 ? 0 : 1}
      </div>
    </div>
  );
};
