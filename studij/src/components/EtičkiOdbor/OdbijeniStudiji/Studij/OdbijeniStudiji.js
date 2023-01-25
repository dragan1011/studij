import React, { useState, useEffect } from "react";
import StudijTabela from "./StudijTabela";

import classes from "./Studiji.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Studij() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [sponzor, setSponzor] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const modal = () => {
    setIsModal(true);
    document.body.style.overflow = "hidden";
  };

  const search = (data) => {
    return data.filter(
      (item) =>
        item.broj.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.opis.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // fetch data
  const dataFetch = async () => {
    const data = await (await fetch("http://localhost:3001/studij")).json();

    // set state when the data received
    setData(data);
  };

  useEffect(() => {
    dataFetch();
    statusFetch();
    sponzorFetch();
  }, [refresh]);

  const refreshFunc = () => {
    setRefresh((prev) => !prev);
  };
  // fetch status
  const statusFetch = async () => {
    const data = await (await fetch("http://localhost:3001/status")).json();

    // set state when the data received
    setStatus(data);
  };
  // fetch status
  const sponzorFetch = async () => {
    const data = await (await fetch("http://localhost:3001/sponzor")).json();

    // set state when the data received
    setSponzor(data);
  };

  const notify = () => {
    toast.success("Uspješno ste prihvatili studij!", {
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

  const notifyOdbij = () => {
    toast.success("Uspješno ste odbili studij!", {
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

  return (
    <div className={classes.dijeteWrapper}>
      <ToastContainer />
      <div className={classes.components}>
        <input
          type="text"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder="Brza pretraga..."
          className={classes.search}
        />
      </div>
      <div className={classes.row_heading}>
        <div className={`${classes.heading} ${classes.naziv}`}>Broj</div>
        <div className={`${classes.heading} ${classes.opis}`}>Opis</div>
        <div className={`${classes.heading} ${classes.opis}`}>Datum od</div>
        <div className={`${classes.heading} ${classes.opis}`}>Datum do</div>
        <div className={`${classes.heading} ${classes.opis}`}>Sponzor</div>
        <div className={`${classes.heading} ${classes.opis}`}>Status</div>
      </div>
      <StudijTabela
        notifyOdbij={notifyOdbij}
        notify={notify}
        sponzor={sponzor}
        status={status}
        refresh={refreshFunc}
        data={search(data)}
      />
    </div>
  );
}

export default Studij;
