import { ErrorPageComponent, NavBarComponent } from "components";
import ROUTES from "constants/routes";
import {
    AdminContainer,
    ApplicationContainer,
    ApplicationTableContainer,
    ChannelContainer,
    DashboardContainer,
    EditAdminContainer,
    InviteFormContainer,
    LoginFormContainer,
    NotificationContainer,
    RecipientContainer,
    RequestContainer,
    VerificationContainer,
} from "containers";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import authApi from "services/auth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    setLoadingStatus,
    setLoginStatus,
    setSystemAdminStatus,
} from "store/slices/userSlice";

function App() {
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const dispatch = useAppDispatch();
    const getValidatedUserApi = useApi(authApi.validateUser);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setLoadingStatus(true));
        getValidatedUserApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getValidatedUserApi.data !== null) {
            if (!getValidatedUserApi.data["loginStatus"]) {
                localStorage.clear();
                dispatch(setLoginStatus(false));
                dispatch(setSystemAdminStatus(false));
                navigate(ROUTES.LOGIN_ROUTE);
            } else if (!getValidatedUserApi.data["systemAdminStatus"]) {
                dispatch(setLoginStatus(true));
                dispatch(setSystemAdminStatus(false));
                localStorage.setItem("systemAdminStatus", "false");
            } else {
                localStorage.setItem("systemAdminStatus", "true");
                dispatch(setLoginStatus(true));
                dispatch(setSystemAdminStatus(true));
            }
            dispatch(setLoadingStatus(false));
        } else if (getValidatedUserApi.error !== "") {
            localStorage.clear();
            dispatch(setLoginStatus(false));
            dispatch(setSystemAdminStatus(false));
            navigate(ROUTES.LOGIN_ROUTE);
            dispatch(setLoadingStatus(false));
        }
    }, [getValidatedUserApi.loading]);

    return (
        <>
            {loginStatus && <NavBarComponent />}
            <Routes>
                <Route
                    path={ROUTES.HOME_ROUTE}
                    element={<LoginFormContainer />}
                />
                <Route path={ROUTES.ADMIN_ROUTE} element={<AdminContainer />} />
                <Route
                    path={ROUTES.LOGIN_ROUTE}
                    element={<LoginFormContainer />}
                />
                <Route
                    path={ROUTES.DASHBOARD_ROUTE}
                    element={<DashboardContainer />}
                />
                <Route
                    path={ROUTES.CHANNELS_ROUTE}
                    element={<ChannelContainer />}
                />
                <Route
                    path={ROUTES.REQUESTS_ROUTE}
                    element={<RequestContainer />}
                />
                <Route
                    path={ROUTES.RECIPIENTS_ROUTE}
                    element={<RecipientContainer />}
                />
                <Route
                    path={ROUTES.APPLICATIONS_ROUTE}
                    element={<ApplicationContainer />}
                />
                <Route
                    path={ROUTES.APPLICATIONSTABLE_ROUTE}
                    element={<ApplicationTableContainer />}
                />
                <Route
                    path={ROUTES.INVITE_ROUTE}
                    element={<InviteFormContainer />}
                />
                <Route
                    path={ROUTES.VERIFY_ROUTE}
                    element={<VerificationContainer />}
                />
                <Route
                    path={ROUTES.EDIT_ADMIN_ROUTE}
                    element={<EditAdminContainer />}
                />
                <Route
                    path={ROUTES.NOTIFICATIONS_ROUTE}
                    element={<NotificationContainer />}
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
