import React, { useState } from "react";

import classes from "./Centar.module.css";

import TopMenuButton from "../UI/TopMenuButton/TopMenuButton";

import Lijekovi from "./Lijekovi/Lijekovi/Lijekovi";
import Dokumenti from "./Dokumenti/Dokumenti/Dokumenti";

function Centar(props) {
  const closeCentar = () => {
    props.closeCentar(false);
    props.showCentar(true);
  };

  const [active, setActive] = useState("Dokumenti");

  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  return (
    <div className={classes.centar}>
      <h3 className={classes.back} onClick={closeCentar}>
        <img
          alt="strelica-nazad"
          className={classes.img}
          src="./utilities/back-arrow.png"
        />{" "}
        <span className={classes.nazad}>Nazad</span>
      </h3>

      <div>
        <div className={classes.menuLook}>
          <TopMenuButton
            name={"Dokumenti"}
            activ={active}
            select={setSelectedHandler}
          >
            <div className={classes.ispravljenje}>Dokumenti</div>
          </TopMenuButton>
          <TopMenuButton
            name={"Lijek"}
            activ={active}
            select={setSelectedHandler}
          >
            <div className={classes.ispravljenje}>Lijek</div>
          </TopMenuButton>
        </div>
        {active === "Dokumenti" && (
          <Dokumenti centarIme={props.centarIme} studijId={props.studijId} />
        )}
        {active === "Lijek" && <Lijekovi studijId={props.studijId} />}
      </div>
    </div>
  );
}
export default Centar;
