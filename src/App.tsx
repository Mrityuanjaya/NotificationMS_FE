import "App.css";
import {
  ADMIN_ROUTE,
  APPLICATIONS_ROUTE,
  CHANNELS_ROUTE,
  ERROR_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATIONS_ROUTE,
  RECIPIENTS_ROUTE,
} from "constants/routes";
import {
  AdminContainer,
  ChannelContainer,
  NotificationContainer,
  RecipientContainer,
} from "containers";
import LoginFormContainer from "containers/LoginForm/LoginFormContainer";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import systemAdminStatusApi from "services/auth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginStatus, setSystemAdminStatus } from "store/slices/userSlice";

import ErrorPageComponent from "components/ErrorPage/ErrorPageComponent";
import NavBarComponent from "components/NavBar/NavBarComponent";
import ApplicationContainer from "containers/Applications/ApplicationContainer";

function App() {
  const loginStatus = useAppSelector((state) => state.user.loginStatus);
  const systemAdminStatus = useAppSelector(
    (state) => state.user.systemAdminStatus
  );
  const dispatch = useAppDispatch();
  const getSystemAdminStatusApi = useApi(
    systemAdminStatusApi.getSystemAdminStatus
  );

  useEffect(() => {
    dispatch(setSystemAdminStatus(localStorage.getItem("isSystemAdmin")));
    getSystemAdminStatusApi.request(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (getSystemAdminStatusApi.data !== null) {
      localStorage.setItem("isSystemAdmin", getSystemAdminStatusApi.data);
      dispatch(setSystemAdminStatus(getSystemAdminStatusApi.data));
      dispatch(setLoginStatus(true));
    }
  }, [getSystemAdminStatusApi.loading]);

  return (
    <>
      {loginStatus && <NavBarComponent />}
      <Routes>
        <Route path={HOME_ROUTE} element={<LoginFormContainer />} />
        {systemAdminStatus && (
          <Route path={ADMIN_ROUTE} element={<AdminContainer />} />
        )}
        {!loginStatus && (
          <Route path={LOGIN_ROUTE} element={<LoginFormContainer />} />
        )}
        {loginStatus && (
          <Route path={CHANNELS_ROUTE} element={<ChannelContainer />} />
        )}
        {loginStatus && (
          <Route
            path={NOTIFICATIONS_ROUTE}
            element={<NotificationContainer />}
          />
        )}
        {loginStatus && (
          <Route path={RECIPIENTS_ROUTE} element={<RecipientContainer />} />
        )}
        {loginStatus && (
          <Route path={APPLICATIONS_ROUTE} element={<ApplicationContainer />} />
        )}
        <Route
          path={ERROR_ROUTE}
          element={<ErrorPageComponent status={404} message="page not found" />}
        />
      </Routes>
    </>
  );
}

export default App;
