import React, { useState } from "react";

import classes from "./Magacin.module.css";
import TopMenuButton from "../UI/TopMenuButton/TopMenuButton";
import Dokumenti from "./Dokumenti";

function Magacin() {
  const [active, setActive] = useState("Stavke");

  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  return (
    <div className={classes.component}>
      <div className={classes.menuLook}>
        <TopMenuButton
          name={"Stavke"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Stavke</div>
        </TopMenuButton>
      </div>
      {active === "Stavke" && <Dokumenti />}
    </div>
  );
}

export default Magacin;
