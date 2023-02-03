import React, { useState } from "react";

import TopMenuButton from "../UI/TopMenuButton/TopMenuButton";

import Statusi from "../Administracija/Statusi/Statusi/Statusi";
import Dobavljaci from "../Administracija/Dobavljaci/Dobavljaci/Dobavljaci";
import Uloge from "../Administracija/Uloge/Uloge/Uloge";
import Clanovi from "../Administracija/ČlanoviEO/Korisnici";
import UlogeEO from "../Administracija/UlogeEO/Uloge/Uloge";
import Korisnici from "../Administracija/Korisnici/Korisnici/Korisnici";
import RezimCuvanja from "../Dostave/RezimCuvanja/RezimCuvanja/RezimCuvanja";
import JedinicaMjere from "../Dostave/JedinicaMjere/JedinicaMjere/JedinicaMjere";

import classes from "./Sifrarnici.module.css";

function Sifrarnici() {
  const [active, setActive] = useState("Statusi");

  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  //Komponente statusi, sponzori, uloge, članovi EO, uloge EO, korisnici se nalaze u ADMINISTRACIJI prema rasporedu komponenti
  //Komponente režim čuvanja i jedinica mjere se nalaze u folderu dostave ili ulaz
  return (
    <div className={classes.component}>
      <div className={classes.menuLook}>
        <TopMenuButton
          name={"Statusi"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Statusi</div>
        </TopMenuButton>
        <TopMenuButton
          name={"Dobavljaci"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Sponzori</div>
        </TopMenuButton>
        <TopMenuButton
          name={"Uloge"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Uloge</div>
        </TopMenuButton>
        <TopMenuButton
          name={"ClanoviEO"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Članovi EO</div>
        </TopMenuButton>
        <TopMenuButton
          name={"UlogeEO"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Uloge EO</div>
        </TopMenuButton>
        <TopMenuButton
          name={"Korisnici"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Korisnici</div>
        </TopMenuButton>
        <TopMenuButton
          name={"RezimCuvanja"}
          activ={active}
          select={setSelectedHandler}
        >
          <div className={classes.ispravljenje}>Režim čuvanja</div>
        </TopMenuButton>
        <TopMenuButton name={"jm"} activ={active} select={setSelectedHandler}>
          <div className={classes.ispravljenje}>Jedinica mjere</div>
        </TopMenuButton>
      </div>
      {active === "Statusi" && <Statusi />}
      {active === "Dobavljaci" && <Dobavljaci />}
      {active === "Uloge" && <Uloge />}
      {active === "ClanoviEO" && <Clanovi />}
      {active === "UlogeEO" && <UlogeEO />}
      {active === "Korisnici" && <Korisnici />}
      {active === "RezimCuvanja" && <RezimCuvanja />}
      {active === "jm" && <JedinicaMjere />}
    </div>
  );
}

export default Sifrarnici;
