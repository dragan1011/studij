import React, { useState, useEffect } from "react";
import Administracija from "../Administracija/Administracija";
import Dostave from "../Dostave/Dostave/Dostave";
import Magacin from "../Magacin/Magacin";
import EtičkiOdbor from "../EtičkiOdbor/EtičkiOdbora";
import Chat from '../Chat/Chat'
import MenuButton from "../UI/MenuButton/MenuButton";
import classes from "./SideMenu.module.css";

function SideMenu({ userData, handleClick }) {
  const [active, setActive] = useState(
    userData?.user[0].role === "admin" ? "Administracija" : "Etičkiodbor"
  );
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false)
  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={classes.show}>
      {chat && <Chat title="Pomoć i podrška" />}
      <img
        className={`${classes.imgArrow} ${!menu ? classes.left : ""}`}
        onClick={toggleMenu}
        alt="strelica"
        src="./utilities/right-arrow.png"
      />
       <img
        className={`${classes.imgChat} ${menu ? classes.smallIcon : '' }`}
        /* onClick={toggleMenu} */
        alt="chat"
        src="./utilities/chatting.png"
      />
      <div
        className={`${classes.sideMenu} ${!menu ? "" : classes.sideMenuSmall}`}
      >

        <div className={classes.userDataWrapper}>
          <span className={`${menu ? classes.ikonica : ""}`}>
            {userData.user[0].pol === "M" ? (
              <img src="./utilities/male.png" />
            ) : (
              <img src="./utilities/business-woman.png" />
            )}
          </span>
          <div className={`${classes.userIme}`}>
            <span className={` ${menu ? classes.smallmenu : ""}`}>
              {userData.user[0].pol === "M" ? "Dobro došao " : "Dobro došla "}{" "}
              <div className={classes.userData}>{userData.user[0].ime}</div>
            </span>
          </div>
        </div>
        <div className={classes.margin}>
          {userData?.user[0].role === "admin" && (
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
          )}
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

        <div className={classes.logoutWrapper}>
          <button onClick={() => handleClick()} className={classes.logout}>
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="magacin"
              src="./utilities/logout.png"
            />{" "}
            <span className={`${menu ? classes.smallText : ""}`}>
              Odjavi se
            </span>
          </button>
        </div>
      </div>
      {/*   {menu && <div className={classes.sideMenuSmall} >
    

        <div className={classes.margin}> 
      <MenuButton name={"Administracija"} activ={active}  select={setSelectedHandler} > <img className={classes.imgSmall} alt='administracija' src='./utilities/analysis.png' /></MenuButton>
      <MenuButton name={"Dostave"} activ={active}  select={setSelectedHandler} ><img  className={classes.imgSmall} alt='dostave' src='./utilities/package.png' /></MenuButton>
      <MenuButton name={"Magacin"} activ={active}  select={setSelectedHandler} ><img className={classes.imgSmall} alt='magacin' src='./utilities/clinic-building.png' /></MenuButton>
      </div>
      </div>} */}

      {active === "Administracija" && userData?.user[0].role === "admin" && (
        <Administracija />
      )}
      {active === "Etičkiodbor" && <EtičkiOdbor />}
      {active === "Dostave" && <Dostave />}
      {active === "Magacin" && <Magacin />}
    </div>
  );
}

export default SideMenu;
