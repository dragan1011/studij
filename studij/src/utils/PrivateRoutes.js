import { Outlet, Navigate } from "react-router-dom";
import React from "react";

const PrivateRoutes = ({ userData, checking }) => {
  return checking ? (
    <p>Checking...</p>
  ) : userData?.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
