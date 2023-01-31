import React, { useState, useEffect } from "react";

import Axios from "axios";

import { useNavigate } from "react-router-dom";

import classes from './Login.module.css'

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

  

  return (
    <div  className={classes.container} >
      <div  className={classes.slika}>
        <img src="./utilities/scientisc.svg" />
      </div>
      <div  className={classes.login_content}>
        <form onSubmit={login}>
          <img className={classes.avatar} src="utilities/test.png" />
          <h2  className={classes.title} >Welcome</h2>
          <div /* className={`${classes.input_div} ${classes.one}`} */>
           
            <div className={`${classes.inputDiv} ${classes.one}`} >
              <h5 className={classes.label}>Korisničko ime</h5>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                 className={classes.input}
              />
            </div>
          </div>
          <div /* className={`${classes.input_div} ${classes.pass}`} */>
            
            <div /* className="div" */>
              <h5 className={classes.label}>Lozinka</h5>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                 className={classes.input} 
              />
            </div>
          </div>
          <button type="submit" className={classes.button}>
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
