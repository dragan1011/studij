import React, { useState } from "react";

import DokumentiEdit from "../DokumentiEdit/DokumentiEdit";

import classes from "./DokumentiTabela.module.css";
import { Dokumenti } from "./DokumentiRed";
import DokumentiDetalji from '../../DokumentiDetalji/DokumentiDetalji'

export default function DijetaTabela(props) {
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalDataDokumenti, setModalDataDokumenti] = useState([])
  const [dokumentiModal, setDokumentiModal] = useState(false)

  const openModalHandler = (data) => {
    setModalData(data);
    setEdit(true);
  };

    const centriModalHandler = (data) => {
    setModalDataDokumenti(data)
    setDokumentiModal(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
      {edit && (
        <DokumentiEdit
          refresh={props.refresh}
          title="Izmjena lijeka"
          data={modalData}
          closeModal={() => setEdit(false)}
        />
      )}
      {dokumentiModal && <DokumentiDetalji refresh={props.refresh} title="Serije" data={modalDataDokumenti} closeModal={()=> setDokumentiModal(false)} />}
      {props.data
        .sort((a, b) => (+a.sifra > +b.sifra ? 1 : -1))
        .map((item) =>
          Number(props.studijId) === Number(item.id_studijskog_centra) ? (
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
