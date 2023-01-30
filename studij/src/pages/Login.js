import React, { useState, useEffect } from "react";

import classes from "./Login.modules.css";

import Axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = ({ setUserData, userData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      setUserData(response.data);
      window.location.reload(true);
    });
  };

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img src="./utilities/scientisc.svg" />
      </div>
      <div className={classes.login_content}>
        <form onSubmit={login}>
          <img src="utilities/test.png" />
          <h2 className={classes.title}>Welcome</h2>
          <div className={`${classes.input_div} ${classes.one}`}>
            <div className={classes.i}>
              <i className="fas fa-user"></i>
            </div>
            <div className={classes.div}>
              <h5>Korisničko ime</h5>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className={classes.input}
              />
            </div>
          </div>
          <div className={`${classes.input_div} ${classes.pass}`}>
            <div className={classes.i}>
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>Lozinka</h5>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className={classes.input}
              />
            </div>
          </div>
          <button type="submit" className={classes.btn}>
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
