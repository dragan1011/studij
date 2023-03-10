import React, { useState, useEffect } from "react";
import Administracija from "../Administracija/Administracija";
import Dostave from "../Dostave/Dostave/Dostave";
import Magacin from "../Magacin/Magacin";
import EtičkiOdbor from "../EtičkiOdbor/EtičkiOdbora";
import Chat from "../Chat/Chat";
import PodesavanjeProfila from "../PodešavanjeProfila/PodesavanjeProfila";
import Trebovanje from "../Trebovanje/Dostave/Dostave";
import Sifrarnici from "../Šifrarnici/Sifrarnici";
import Izlaz from "../Izlaz/Izlaz";
import MenuButton from "../UI/MenuButton/MenuButton";
import classes from "./SideMenu.module.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideMenu({ userData, afterLogout }) {
  const [active, setActive] = useState(
    userData?.user?.role === "admin" ? "Administracija" : "Etičkiodbor"
  );
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [data, setData] = useState("");
  const [users, setUsers] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [settings, setSettings] = useState(false);
  const setSelectedHandler = (naziv) => {
    setActive(naziv);
  };
  useEffect(() => {
    messageFetch();
    usersFetch();
  }, [refresh]);

  const onLogout = async () => {
    try {
      await Axios.post("http://localhost:3001/logout", {
        name: "userId",
      });
      afterLogout();
    } catch (error) {
      console.error(error);
    }
  };

  const notify = () => {
    toast.success("Podaci su uspješno izmijenjeni!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const messageFetch = async () => {
    const data = await (await fetch("http://localhost:3001/poruke")).json();

    // set state when the data received
    setData(data);
  };
  const usersFetch = async () => {
    const data = await (await fetch("http://localhost:3001/users")).json();

    // set state when the data received
    setUsers(data);
  };

  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };
  const toggleChat = () => {
    setChat((prevState) => !prevState);
  };
  const toggleSettings = () => {
    setSettings((prevState) => !prevState);
  };
  if (!userData.user) {
    return "Loading...";
  }

  return (
    <div className={classes.show}>
      <ToastContainer />
      {chat && (
        <Chat
          users={users}
          refresh={setRefresh}
          userData={userData}
          closeModal={setChat}
          title="Pomoć i podrška"
          data={data}
        />
      )}
      {settings && (
        <PodesavanjeProfila
          users={users}
          userData={userData}
          title="Podešavanja"
          closeModal={setSettings}
          notify={notify}
        />
      )}
      <img
        className={`${classes.imgArrow} ${!menu ? classes.left : ""}`}
        onClick={toggleMenu}
        alt="strelica"
        src="./utilities/right-arrow.png"
      />
      <img
        className={`${classes.imgSettings} ${menu ? classes.smallIcon : ""} ${
          settings ? classes.imgSettingsActive : ""
        }`}
        onClick={toggleSettings}
        alt="settings"
        src="./utilities/setting.png"
      />
      <img
        className={`${classes.imgChat} ${menu ? classes.smallIcon : ""}`}
        onClick={toggleChat}
        alt="chat"
        src="./utilities/chatting.png"
      />
      <div
        className={`${classes.sideMenu} ${!menu ? "" : classes.sideMenuSmall}`}
      >
        <div className={classes.userDataWrapper}>
          <span className={`${menu ? classes.ikonica : ""}`}>
            {userData.user.pol === "M" ? (
              <img src="./utilities/male.png" />
            ) : (
              <img src="./utilities/business-woman.png" />
            )}
          </span>
          <div className={`${classes.userIme}`}>
            <span className={` ${menu ? classes.smallmenu : ""}`}>
              {userData.user.pol === "M" ? "Dobro došao " : "Dobro došla "}{" "}
              <div className={classes.userData}>{userData.user.ime}</div>
            </span>
          </div>
        </div>
        <div className={classes.margin}>
          {userData?.user.role === "admin" && (
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
          {userData?.user.role === "admin" && (
            <MenuButton
              name={"Šifrarnici"}
              activ={active}
              select={setSelectedHandler}
            >
              <img
                className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
                alt="eodbor"
                src="./utilities/search.png"
              />
              <span className={`${menu ? classes.smallText : ""}`}>
                Šifrarnici
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
          <MenuButton
            name={"Trebovanje"}
            activ={active}
            select={setSelectedHandler}
          >
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="dostave"
              src="./utilities/bill.png"
            />
            <span className={`${menu ? classes.smallText : ""}`}>
              Trebovanje
            </span>
          </MenuButton>
          <MenuButton name={"Izlaz"} activ={active} select={setSelectedHandler}>
            <img
              className={`${classes.img} ${menu ? classes.imgSmall : ""}`}
              alt="dostave"
              src="./utilities/exit.png"
            />
            <span className={`${menu ? classes.smallText : ""}`}>Izlaz</span>
          </MenuButton>
        
        </div>

        <div className={classes.logoutWrapper}>
          <button onClick={onLogout} className={classes.logout}>
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

      {active === "Administracija" && userData?.user.role === "admin" && (
        <Administracija />
      )}
      {active === "Šifrarnici" && userData?.user.role === "admin" && (
        <Sifrarnici />
      )}
      {active === "Etičkiodbor" && <EtičkiOdbor />}
      {active === "Dostave" && <Dostave />}
      {active === "Trebovanje" && <Trebovanje />}
      {active === "Izlaz" && <Izlaz />}
      {active === "Magacin" && <Magacin />}
    </div>
  );
}

export default SideMenu;
