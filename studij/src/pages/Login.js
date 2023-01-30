import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <div>Prijava</div>
      <div>
        <form onSubmit={login}>
          <label>Korisničko ime</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Lozinka</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button>Prijavi se</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
