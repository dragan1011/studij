import React, { useState } from "react";
import Administracija from "../Administracija/Administracija";
import Dostave from "../Dostave/Dostave/Dostave";
import Magacin from "../Magacin/Magacin";
import EtičkiOdbor from '../EtičkiOdbor/EtičkiOdbora'
import MenuButton from "../UI/MenuButton/MenuButton";
import classes from "./SideMenu.module.css";

function SideMenu() {
  const [active, setActive] = useState("Administracija");
  const [menu, setMenu] = useState(false);
  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={classes.show}>
      <img
        className={`${classes.imgArrow} ${!menu ? classes.left : ""}`}
        onClick={toggleMenu}
        alt="strelica"
        src="./utilities/right-arrow.png"
      />
      <div
        className={`${classes.sideMenu} ${!menu ? "" : classes.sideMenuSmall}`}
      >
        <div className={classes.margin}>
          <MenuButton
            name={"Administracija"}
            activ={active}
            select={setSelectedHandler}
          >
            {" "}
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="administracija"
              src="./utilities/analysis.png"
            />
            <span className={`${menu ? classes.smallText : ""}`}>
              Administracija
            </span>
          </MenuButton>
          <MenuButton
            name={"Etičkiodbor"}
            activ={active}
            select={setSelectedHandler}
          >
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="eodbor"
              src="./utilities/meeting.png"
            />
            <span className={`${menu ? classes.smallText : ""}`}>
              Etički odbor
            </span>
          </MenuButton>
          <MenuButton
            name={"Dostave"}
            activ={active}
            select={setSelectedHandler}
          >
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="dostave"
              src="./utilities/package.png"
            />
            <span className={`${menu ? classes.smallText : ""}`}>Dostave</span>
          </MenuButton>
          <MenuButton
            name={"Magacin"}
            activ={active}
            select={setSelectedHandler}
          >
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="magacin"
              src="./utilities/clinic-building.png"
            />
            <span className={`${menu ? classes.smallText : ""}`}>Magacin</span>
          </MenuButton>
        </div>
      </div>
      {/*   {menu && <div className={classes.sideMenuSmall} >
    

        <div className={classes.margin}> 
      <MenuButton name={"Administracija"} activ={active}  select={setSelectedHandler} > <img className={classes.imgSmall} alt='administracija' src='./utilities/analysis.png' /></MenuButton>
      <MenuButton name={"Dostave"} activ={active}  select={setSelectedHandler} ><img  className={classes.imgSmall} alt='dostave' src='./utilities/package.png' /></MenuButton>
      <MenuButton name={"Magacin"} activ={active}  select={setSelectedHandler} ><img className={classes.imgSmall} alt='magacin' src='./utilities/clinic-building.png' /></MenuButton>
      </div>
      </div>} */}

      {active === "Administracija" && <Administracija />}
      {active === "Etičkiodbor" && <EtičkiOdbor />}
      {active === "Dostave" && <Dostave />}
      {active === "Magacin" && <Magacin />}
    </div>
  );
}

export default SideMenu;
