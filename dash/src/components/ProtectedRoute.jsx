// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../util/auth";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;