import React, { useState } from "react";

//import CentarEdit from '../CentarEditAddKorisnik/CentarEdit'

import classes from "./CentriTabela.module.css";
import { CentriRed } from "./CentriRed";

export default function DijetaTabela(props) {
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState([]);

  const openModalHandler = (data) => {
    setModalData(data);
    setEdit(true);
  };

  return (
    <div className={classes.dijeteWrapper}>
      {/*  {edit && <CentarEdit  refresh={props.refresh} title="Izmjena centra" data={modalData} closeModal={()=> setEdit(false)} />} */}

      {Array.from(props.data)
        .sort((a, b) => (+a.sifra.slice(3, 6) > +b.sifra.slice(3, 6) ? 1 : -1))
        .map((item) =>
          Number(props.studijId) === Number(item.id_studija) ? (
            <CentriRed
              centarIme={props.centarIme}
              centar={props.centar}
              centarId={props.centarId}
              key={Math.random()}
              {...item}
              open={openModalHandler}
            ></CentriRed>
          ) : (
            ""
          )
        )}
    </div>
  );
}
