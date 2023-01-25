import React, { useState } from "react";

import Centri from "../Centri/Centri";
import classes from "./StudijTabela.module.css";
import { StudijRed } from "./StudijRed";

export default function DijetaTabela(props) {
  const [modalData, setModalData] = useState([]);
  const [modalDataCentri, setModalDataCentri] = useState([]);
  const [centriModal, setCentriModal] = useState(false);

  const openModalHandler = (data) => {
    setModalData(data);
  };

  const centriModalHandler = (data) => {
    setModalDataCentri(data);
    setCentriModal(true);
  };

  return (
    <div className={classes.dijeteWrapper}>
      {centriModal && (
        <Centri
          notifyOdbij={props.notifyOdbij}
          notify={props.notify}
          refresh={props.refresh}
          title="Promjena statusa studija"
          data={modalDataCentri}
          closeModal={() => setCentriModal(false)}
        />
      )}
      {props.data
        .sort((a, b) => (+a.broj > +b.broj ? 1 : -1))
        .map((item) =>
          Number(item.id_statusa) === Number(14) ? (
            <StudijRed
              sponzor={props.sponzor}
              status={props.status}
              key={item.id}
              openCentri={centriModalHandler}
              {...item}
              open={openModalHandler}
            ></StudijRed>
          ) : (
            ""
          )
        )}
    </div>
  );
}
