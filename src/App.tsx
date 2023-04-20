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
import DashboardContainer from "containers/Dashboard/DashboardContainer";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import systemAdminStatusApi from "services/auth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    setLoadingStatus,
    setLoginStatus,
    setSystemAdminStatus,
} from "store/slices/userSlice";

function App() {
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const dispatch = useAppDispatch();
    const getSystemAdminStatusApi = useApi(
        systemAdminStatusApi.getSystemAdminStatus
    );
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setLoadingStatus(true));
        dispatch(setSystemAdminStatus(localStorage.getItem("isSystemAdmin")));
        dispatch(setLoginStatus(localStorage.getItem("token") != null));
        getSystemAdminStatusApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getSystemAdminStatusApi.data !== null) {
            localStorage.setItem("isSystemAdmin", getSystemAdminStatusApi.data);
            dispatch(setSystemAdminStatus(getSystemAdminStatusApi.data));
            dispatch(setLoginStatus(true));
        }
        dispatch(setLoadingStatus(false));
    }, [getSystemAdminStatusApi.loading]);

    
    return (
        <>
            {loginStatus && <NavBarComponent />}
            <Routes>
                <Route
                    path={ROUTES.HOME_ROUTE}
                    element={<LoginFormContainer />}
                />
                {systemAdminStatus && loginStatus && (
                    <Route
                        path={ROUTES.ADMIN_ROUTE}
                        element={<AdminContainer />}
                    />
                )}
                {!loginStatus && (
                    <Route
                        path={ROUTES.LOGIN_ROUTE}
                        element={<LoginFormContainer />}
                    />
                )}

                <Route
                    path={ROUTES.DASHBOARD_ROUTE}
                    element={<DashboardContainer />}
                    // element={loginStatus ? <DashboardContainer /> : navigate(ROUTES.LOGIN_ROUTE)}
                />

                {loginStatus && (
                    <Route
                        path={ROUTES.CHANNELS_ROUTE}
                        element={<ChannelContainer />}
                    />
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
                    <Route
                        path={ROUTES.INVITE_ROUTE}
                        element={<InviteFormContainer />}
                    />
                )}
                <Route
                    path={ROUTES.VERIFY_ROUTE}
                    element={<VerificationContainer />}
                />
                <Route
                    path={ROUTES.ERROR_ROUTE}
                    element={
                        <ErrorPageComponent
                            status={404}
                            message="page not found"
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
