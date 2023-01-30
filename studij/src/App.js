import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useState, useEffect } from "react";
import Axios from "axios";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  const [userData, setUserData] = useState();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/login")
      .then((response) => {
        if (response.data.loggedIn == true) {
          setUserData(response.data);
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={<PrivateRoutes userData={userData} checking={checking} />}
          >
            <Route element={<SideMenu userData={userData} />} path="/" exact />
            {/*  <Route element={<Products />} path="/products" /> */}
          </Route>
          <Route
            element={<Login setUserData={setUserData} userData={userData} />}
            path="/login"
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
