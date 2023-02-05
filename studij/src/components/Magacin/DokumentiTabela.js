import React, { useState } from "react";

import classes from "./DokumentiTabela.module.css";
import { Dokumenti } from "./DokumentiRed";

export default function DijetaTabela(props) {
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalDataDokumenti, setModalDataDokumenti] = useState([]);
  const [dokumentiModal, setDokumentiModal] = useState(false);

  const openModalHandler = (data) => {
    setModalData(data);
    setEdit(true);
  };

  const centriModalHandler = (data) => {
    setModalDataDokumenti(data);
    setDokumentiModal(true);
  };

  return (
    <div className={classes.dijeteWrapper}>
      {props.data
        .sort((a, b) => (+a.sifra > +b.sifra ? 1 : -1))
        .map((item) =>
          Number(item.kulaz) === 1 &&
          Number(item.kizlaz) === 1 &&
          Number(item.knarudzba) === 0 ? (
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
