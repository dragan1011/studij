import React, { useState } from "react";

import DokumentiDetaljiEdit from "./DokumentiDetaljiEdit/DokumentiDetaljiEdit";

import classes from "./DokumentDetaljiTabela.module.css";
import { DokumentDetaljiRed } from "./DokumentDetaljiRed";


export default function DijetaTabela(props) {
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState([]);

  const openModalHandler = (data) => {
    setModalData(data);
    setEdit(true);
  };

  return (
    <div className={classes.dijeteWrapper}>
      {edit && (
        <DokumentiDetaljiEdit
          refresh={props.refresh}
          title="Izmjena serije"
          data={modalData}
          closeModal={() => setEdit(false)}
        />
      )}

      {props.data
        .sort((a, b) => (+a.id > +b.id ? 1 : -1))
        .map((item) =>
          Number(props.dokumentData.id) === Number(item.id_dokumenta) ? (
            <DokumentDetaljiRed
              dokumentData={props.dokumentData}
              centarId={props.centarId}
              key={Math.random()}
              {...item}
              open={openModalHandler}
            ></DokumentDetaljiRed>
          ) : (
            ''
          )
        )}
    
    </div>
  );
}
