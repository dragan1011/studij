import React, { useState } from "react";

import classes from "./DokumentiTabela.module.css";
import { Dokumenti } from "./DokumentiRed";
import DokumentiDetalji from './DokumentiIzlaz/Dokumenti/DokumentiDetalji'

export default function DijetaTabela(props) {
  const [dokument, setDokument] = useState('')
  const [modalData, setModalData] = useState([]);
  const [modalDataDokumenti, setModalDataDokumenti] = useState([]);
  const [dokumentiModal, setDokumentiModal] = useState(false);

  const openModalHandler = (data) => {
    setModalData(data);
    setDokument(true);
   
  };
  const centriModalHandler = (data) => {
    setModalDataDokumenti(data);
    setDokumentiModal(true);
  };

  return (
    <div className={classes.dijeteWrapper}>

      {dokument && <DokumentiDetalji  title="Izmjena dokumenta"
          data={modalData}
          closeModal={() => setDokument(false)} />}
      {props.data
        .sort((a, b) => (+a.sifra > +b.sifra ? 1 : -1))
        .map((item) =>
          Number(item.id_status) === 2 ? (
            <Dokumenti
              jedinica={props.jm}
              rezim={props.rezim}
              key={item.id}
              {...item}
              openDokumenti={centriModalHandler}
              open={openModalHandler}
            ></Dokumenti>
          ) : (
            ""
          )
        )}
    </div>
  );
}
