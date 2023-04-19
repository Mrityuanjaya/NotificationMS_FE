import { Routes, Route } from "react-router-dom";
import LoginFormComponent from "containers/LoginForm/LoginFormContainer";
import NotFound from "components/NotFound/NotFound";
import routes from "constants/routes";

function App() {
  return (
    <Routes>
      <Route path={routes.login} element={<LoginFormComponent />} />
      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
}

export default App;
