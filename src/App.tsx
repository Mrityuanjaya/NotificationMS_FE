import "App.css";
import ErrorPageComponent from "components/ErrorPage/ErrorPageComponent";
import NavBarComponent from "components/NavBar/NavBarComponent";
import {
    ADMIN_ROUTE,
    CHANNELS_ROUTE,
    ERROR_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    NOTIFICATIONS_ROUTE,
    RECIPIENTS_ROUTE,
} from "constants/routes";
import {AdminContainer, ChannelContainer, LoginContainer, NotificationContainer, RecipientContainer} from "containers";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import loginApi from "services/auth";

function App() {
    const postLoginApi = useApi(loginApi.loginUser);
    useEffect(() => {
        postLoginApi.request("nancyy@example.com", "string");
    }, []);
    return (
        <>
            <NavBarComponent />
            <Routes>
                <Route path={HOME_ROUTE} element={<LoginContainer />} />
                <Route path={HOME_ROUTE} element={<AdminContainer />} />
                <Route path={LOGIN_ROUTE} element={<LoginContainer />} />
                <Route path={CHANNELS_ROUTE} element={<ChannelContainer />} />
                <Route
                    path={NOTIFICATIONS_ROUTE}
                    element={<NotificationContainer />}
                />
                <Route
                    path={RECIPIENTS_ROUTE}
                    element={<RecipientContainer />}
                />
                <Route
                    path={ERROR_ROUTE}
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
