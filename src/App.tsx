import "App.css";
import { ErrorPageComponent, NavBarComponent } from "components";
import ROUTES from "constants/routes";
import {
  AdminContainer,
  ApplicationContainer,
  ChannelContainer,
  InviteFormContainer,
  LoginFormContainer,
  NotificationContainer,
  RecipientContainer,
  VerificationContainer,
} from "containers";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import systemAdminStatusApi from "services/auth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginStatus, setSystemAdminStatus } from "store/slices/userSlice";

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
        <Route path={ROUTES.HOME_ROUTE} element={<LoginFormContainer />} />
        {systemAdminStatus && (
          <Route path={ROUTES.ADMIN_ROUTE} element={<AdminContainer />} />
        )}
        {!loginStatus && (
          <Route path={ROUTES.LOGIN_ROUTE} element={<LoginFormContainer />} />
        )}
        {loginStatus && (
          <Route path={ROUTES.CHANNELS_ROUTE} element={<ChannelContainer />} />
        )}
        {loginStatus && (
          <Route
            path={ROUTES.NOTIFICATIONS_ROUTE}
            element={<NotificationContainer />}
          />
        )}
        {loginStatus && (
          <Route
            path={ROUTES.RECIPIENTS_ROUTE}
            element={<RecipientContainer />}
          />
        )}
        {loginStatus && (
          <Route
            path={ROUTES.APPLICATIONS_ROUTE}
            element={<ApplicationContainer />}
          />
        )}
        {loginStatus && (
          <Route path={ROUTES.INVITE_ROUTE} element={<InviteFormContainer />} />
        )}
        <Route path={ROUTES.VERIFY_ROUTE} element={<VerificationContainer />} />
        <Route
          path={ROUTES.ERROR_ROUTE}
          element={<ErrorPageComponent status={404} message="page not found" />}
        />
      </Routes>
    </>
  );
}

export default App;
