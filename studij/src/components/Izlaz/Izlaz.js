import React, { useState } from "react";

import classes from "./Izlaz.module.css";
import TopMenuButton from "../UI/TopMenuButton/TopMenuButton";
import Dokumenti from "./Dokumenti";

function Izlaz() {
  const [active, setActive] = useState("Dokumenti");

  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  return (
    <div className={classes.component}>
      <div className={classes.menuLook}>
        <TopMenuButton
          name={"Dokumenti"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Dokumenti</div>
        </TopMenuButton>
      </div>
      {active === "Dokumenti" && <Dokumenti />}
    </div>
  );
}

export default Izlaz;
