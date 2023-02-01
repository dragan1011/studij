import React, { useState } from "react";

import KorisnikEdit from "../KorisnikEdit/KorisnikEdit";

import classes from "./KorisniciTabela.module.css";
import { KorisniciRed } from "./KorisniciRed";

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
        <KorisnikEdit
          refresh={props.refresh}
          title="Izmjena korisnika"
          data={modalData}
          closeModal={() => setEdit(false)}
        />
      )}
      {props.data
        .sort((a, b) => (+a.sifra > +b.sifra ? 1 : -1))
        .map((item) => (
          <KorisniciRed
            key={item.id}
            {...item}
            open={openModalHandler}
          ></KorisniciRed>
        ))}
    </div>
  );
}
