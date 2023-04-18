import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginUser from "containers/LoginForm/LoginFormContainer";
import NotFound from "components/NotFound/NotFound";
import routes from "constants/routes";

function App() {
  return (
    <React.StrictMode>
      <Routes>
        <Route path={routes.login} element={<LoginUser />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </React.StrictMode>
  );
}

export default App;
