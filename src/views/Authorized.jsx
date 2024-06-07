import { Navigate, useLocation } from "react-router-dom";
import React from "react";

export const Authorized = ({ children }) => {
  let location = useLocation();
  const user = localStorage.getItem("nutshell_user");

  // Check if user is logged in. If they are, parse the user and render the CHILD components
  if (user) {
    const currentUser = JSON.parse(user);
    return React.cloneElement(children, { currentUser });
  }
  // If the user is NOT logged in, redirect them to the login page using the Navigate component from react-router-dom
  else {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }
};
