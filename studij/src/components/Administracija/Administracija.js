import React, { useState, useEffect } from "react";

import TopMenuButton from "../UI/TopMenuButton/TopMenuButton";

import Studiji from "./Studiji/Studij/Studiji";

import classes from "./Administracija.module.css";

function Administracija() {
  const [active, setActive] = useState("Studiji");

  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  return (
    <div className={classes.component}>
      <div className={classes.menuLook}>
        <TopMenuButton
          name={"Studiji"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Studiji</div>
        </TopMenuButton>
      </div>
      {active === "Studiji" && <Studiji />}
    </div>
  );
}

export default Administracija;
