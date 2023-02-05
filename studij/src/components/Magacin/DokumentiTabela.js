import React, { useState } from "react";

import classes from "./DokumentiTabela.module.css";
import { Dokumenti } from "./DokumentiRed";

import InfoModal from "./InfoModal/InfoModal";

export default function DijetaTabela(props) {
  const [info, setInfo] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalDataDokumenti, setModalDataDokumenti] = useState([]);
  const [dokumentiModal, setDokumentiModal] = useState(false);

  const openModalHandler = (data) => {
    setModalData(data);
    setInfo(true);
  };

  const centriModalHandler = (data) => {
    setModalDataDokumenti(data);
    setDokumentiModal(true);
  };

  return (
    <div className={classes.dijeteWrapper}>
      {info && (
        <InfoModal
          title={"Podaci o stavkama"}
          trebovanje={props.trebovanje}
          dokumenti={props.dokumenti}
          rowData={modalData}
          closeModal={() => setInfo(false)}
        />
      )}
      {props.data
        .sort((a, b) => (+a.sifra > +b.sifra ? 1 : -1))
        .map((item) => (
          <Dokumenti
            jedinica={props.jm}
            rezim={props.rezim}
            key={item.id}
            {...item}
            openDokumenti={centriModalHandler}
            open={openModalHandler}
          ></Dokumenti>
        ))}
    </div>
  );
}
