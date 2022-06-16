import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./home/Home";
import SignUp from "./signup/SignUp";
import Login from "./login/Login";

import { useAuthContext } from "../hooks/useAuthContext";

const Pages = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="login" />} />
        <Route
          path="signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Pages;
