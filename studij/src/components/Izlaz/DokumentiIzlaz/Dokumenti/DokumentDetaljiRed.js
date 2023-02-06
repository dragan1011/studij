import React from "react";
import classes from "./DokumentDetaljiTabela.module.css";

export const DokumentDetaljiRed = (props) => {
  let key = 0;
  key++;

  const openModalHandler = () => {
    const tempData = {
      id: props.id,
      vrsta: props.vrsta,
      datum: props.datum,
      oznaka: props.oznaka,
      id_dokumenta_trebovanje: props.id_dokumenta_trebovanje,
      napomena: props.napomena,
       id_statusa: props.id_statusa
    };
    props.open(tempData);
  };

  const openModalSerije = () => {
    const tempData = {
      id: props.id,
      vrsta: props.vrsta,
      datum: props.datum,
      oznaka: props.oznaka,
      id_dokumenta_trebovanje: props.id_dokumenta_trebovanje,
      napomena: props.napomena,
      id_statusa: props.id_statusa
    };
    props.openSerijeModal(tempData);
  };
  return (
    <div
      className={`${classes.row} ${
        (props.id / 2) % 1 ? classes.drugiRed : classes.prviRed
      } ${
        Number(props.id_statusa) === Number(2)
          ? classes.red
          :  ""
      } `}
      key={props.sifra}
      
    >
       <div className={`${classes.cell} ${classes.naziv}`} onClick={openModalSerije}>{props.oznaka}</div>
      <div className={`${classes.cell} ${classes.naziv}`} onClick={openModalSerije}>
        {props.datum}
      </div>
     
      <div className={`${classes.cell} ${classes.naziv}`} onClick={openModalSerije}>
        {props.napomena}
      </div>
  <div className={`${classes.cell} ${classes.naziv}`} onClick={openModalSerije}>
       {Number(props.id_statusa) === Number(1)
          ? "Otključan"
          : "Zaključan"
          }
      </div>
      <div onClick={openModalHandler} className={`${classes.cell} ${classes.lokacija} ${classes.izmjena}`}>
     Izmjena dokumenta
      </div>
    </div>
  );
};
