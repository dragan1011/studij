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

  const openDokumentiModal = () => {
    const tempData = {
      id: props.id,
      oznaka: props.oznaka,
      datum: props.datum,
      id_studijskog_centra: props.id_studijskog_centra,
      napomena: props.napomena,
      id_status: props.id_status,
    };
    props.openDokumenti(tempData);
  };

  return (
    <div
      className={`${classes.row} ${
        (props.id / 2) % 1 ? classes.drugiRed : classes.prviRed
      } ${
        Number(props.id_status) === Number(2)
          ? classes.red
          :  ""
      }`}
      key={props.id}
    >
      <div
        className={`${classes.cell} ${classes.naziv}`}
        onClick={openDokumentiModal}
      >
        {props.oznaka}
      </div>
      <div
        className={`${classes.cell} ${classes.naziv}`}
        onClick={openDokumentiModal}
      >
        {props.datum}
      </div>
      <div
        className={`${classes.cell} ${classes.naziv}`}
        onClick={openDokumentiModal}
      >
        {props.napomena}
      </div>
      <div
        className={`${classes.cell} ${classes.naziv}`}
        onClick={openDokumentiModal}
      >
        {Number(props.id_status) === Number(1)
          ? "Otključan"
          : "Zaključan"
          }
      </div>
      <div
        className={`${classes.cell} ${classes.lokacija} ${classes.izmjena}`}
        onClick={openModalHandler}
      >
        Izmjena
      </div>
    </div>
  );
};
