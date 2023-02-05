import React, { useState } from "react";

import classes from "./DokumentiTabela.module.css";
import { Dokumenti } from "./DokumentiRed";
import ConfirmModal from "./ConfirmModal/ConfirmModal";

export default function DijetaTabela(props) {
  const [odobri, setOdobri] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalDataDokumenti, setModalDataDokumenti] = useState([]);
  const [dokumentiModal, setDokumentiModal] = useState(false);

  const openModalHandler = (data) => {
    setModalData(data);
    setOdobri(true);
  };
  const centriModalHandler = (data) => {
    setModalDataDokumenti(data);
    setDokumentiModal(true);
  };

  return (
    <div className={classes.dijeteWrapper}>
      {odobri && (
        <ConfirmModal
          title="Potvrda"
          data={modalData}
          refresh={props.refresh}
          closeModal={() => setOdobri(false)}
        />
      )}
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
