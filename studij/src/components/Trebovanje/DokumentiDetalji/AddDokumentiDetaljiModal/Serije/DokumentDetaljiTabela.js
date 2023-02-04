import React, { useState } from "react";

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
      {props.data
        .sort((a, b) => (+a.id > +b.id ? 1 : -1))
        .map((item) =>
          item.id_dokumenta_trebovanje >= 1 ? (
            ""
          ) : (
            <DokumentDetaljiRed
              selectedIds={props.selectedIds}
              setSelectedIds={props.setSelectedIds}
              lijek={props.lijek}
              dokumentData={props.dokumentData}
              centarId={props.centarId}
              key={Math.random()}
              {...item}
              open={openModalHandler}
            ></DokumentDetaljiRed>
          )
        )}
    </div>
  );
}
