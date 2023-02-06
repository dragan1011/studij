import React, { useState } from "react";

import DokumentiEdit from "../DokumentiEdit/DokumentiEdit";

import classes from "./DokumentDetaljiTabela.module.css";
import { DokumentDetaljiRed } from "./DokumentDetaljiRed";
import DokumentiDetalji from '../../BiranjeTrebovaneSerije/DokumentiDetalji'


export default function DijetaTabela(props) {
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [serije, setSerije] = useState(false)

  const openModalHandler = (data) => {
    setModalData(data);
    setEdit(true);
  };

  const openSerijeModal = (data) => {
    setModalData(data);
    setSerije(true);
  };


  return (
    <div className={classes.dijeteWrapper}>
      {edit && (
        <DokumentiEdit
          refresh={props.refresh}
          title="Izmjena dokumenta"
          data={modalData}
          closeModal={() => setEdit(false)}
        />
      )} 
       {serije && (
        <DokumentiDetalji
        trebovanjeData={props.trebovanjeData}
          refresh={props.refresh}
          title="Serije"
          data={modalData}
           closeModal={() => setSerije(false)}
        />
      )} 

      {props.data
         .sort((a, b) => (+a.id > +b.id ? 1 : -1))
        .map((item) =>
           Number(props.dokumentData.id) === Number(item.id_dokumenta_trebovanje) ? (
            <DokumentDetaljiRed
              dokumentData={props.dokumentData}
              centarId={props.centarId}
              key={Math.random()}
              {...item}
              openSerijeModal={openSerijeModal}
              open={openModalHandler}
            ></DokumentDetaljiRed>
          )  : (
            ''
          ) 
        )}
    
    </div>
  );
}
