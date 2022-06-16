import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Pages from "./pages/Pages";

import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { authIsReady } = useAuthContext();
  return (
    <Fragment>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Pages />
        </BrowserRouter>
      )}
    </Fragment>
  );
};

export default App;
