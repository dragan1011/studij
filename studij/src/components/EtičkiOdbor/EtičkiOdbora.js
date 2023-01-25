import React, { useState, useEffect } from "react";

import TopMenuButton from "../UI/TopMenuButton/TopMenuButton";

import Studiji from "./Studiji/Studij/Studiji";
import OdbijeniStudiji from "./OdbijeniStudiji/Studij/OdbijeniStudiji";

import classes from "./EtičkiOdbor.module.css";

function Administracija() {
  const [active, setActive] = useState("NaČekanju");

  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  /*  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "1") {
      setActive('Studiji')
    }else if (e.key === "2") {
      setActive('Statusi')
    }else if (e.key === "3") {
      setActive('Dobavljaci')
    }else if (e.key === "4") {
      setActive('Uloge')
    }
  } 

 */
  return (
    <div className={classes.component}>
      <div className={classes.menuLook}>
        <TopMenuButton
          name={"NaČekanju"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Na čekanju</div>
        </TopMenuButton>
        <TopMenuButton
          name={"odbijeni"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Odbijeni Studiji</div>
        </TopMenuButton>
      </div>
      {active === "NaČekanju" && <Studiji />}
      {active === "odbijeni" && <OdbijeniStudiji />}
    </div>
  );
}

export default Administracija;
