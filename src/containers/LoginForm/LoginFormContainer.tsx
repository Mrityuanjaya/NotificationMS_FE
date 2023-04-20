import {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    SYSTEM_ADMIN_ROLE,
    TOAST_CONFIG,
} from "constants/constants";
import { CHANNELS_ROUTE } from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginApi from "services/auth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginStatus, setSystemAdminStatus } from "store/slices/userSlice";

import LoaderComponent from "components/Loader/loader";
import LoginFormComponent from "components/LoginForm/LoginFormComponent";

const LoginFormContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const postLoginApi = useApi(loginApi.loginUser);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    async function handleClick(email: string, password: string) {
        if (email.length === 0)
            toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
        else if (password.length === 0)
            toast.error(ERROR_MESSAGES.PASSWORD_REQUIRED, TOAST_CONFIG);
        else if (!EMAIL_REGEX.test(email))
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else {
            await postLoginApi.request(email, password);
        }
    }
    useEffect(() => {
        if (postLoginApi.data !== null) {
            {
                localStorage.setItem(
                    "token",
                    postLoginApi.data["access_token"]
                );
                dispatch(setLoginStatus(true));
                dispatch(
                    setSystemAdminStatus(
                        postLoginApi.data["role"] == SYSTEM_ADMIN_ROLE
                    )
                );
                localStorage.setItem(
                    "isSystemAdmin",
                    (postLoginApi.data["role"] == SYSTEM_ADMIN_ROLE).toString()
                );
                toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESSFUL, TOAST_CONFIG);
                navigate(CHANNELS_ROUTE);
            }
        } else if (postLoginApi.error !== "") {
            toast.error(postLoginApi.error, TOAST_CONFIG);
        }
    }, [postLoginApi.loading]);

    if (loadingStatus) return <LoaderComponent />;
    else return <LoginFormComponent onClickFunction={handleClick} />;
};

export default LoginFormContainer;
