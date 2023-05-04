import {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    MAX_EMAIL_LENGTH,
    MAX_NAME_LENGTH,
    TOAST_CONFIG,
} from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import channelsApi from "services/channel";
import { useAppSelector } from "store/hooks";

import ChannelFormComponent from "components/ChannelForm/ChannelFormComponent";

const EditChannelContainer = () => {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);

    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!loadingStatus && !systemAdminStatus)
        navigate(ROUTES.DASHBOARD_ROUTE);

    const { alias } = useParams();
    const getChannelApi = useApi(channelsApi.getChannel);
    const updateChannelApi = useApi(channelsApi.updateChannel);
    const [data, setData] = useState();

    useEffect(() => {
        getChannelApi.request(alias, localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getChannelApi.data != null) setData(getChannelApi.data);
    }, [getChannelApi.loading]);

    const handleSubmit = (
        applicationId: number,
        name: string,
        alias: string,
        description: string,
        MAIL_USERNAME: string,
        MAIL_PASSWORD: string,
        MAIL_FROM: string,
        MAIL_PORT: number,
        MAIL_SERVER: string,
        USE_CREDENTIALS: number,
        MAIL_STARTTLS: number,
        MAIL_SSL_TLS: number
    ) => {
        if (name.length === 0)
            toast.error(ERROR_MESSAGES.NAME_REQUIRED, TOAST_CONFIG);
        else if (name.length > MAX_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
        else if (alias.length > MAX_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
        else if (MAIL_USERNAME.length === 0)
            toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
        else if (MAIL_USERNAME.length > MAX_EMAIL_LENGTH)
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else if (MAIL_PASSWORD.length < 8)
            toast.error(ERROR_MESSAGES.MIN_PASSWORD_LENGTH, TOAST_CONFIG);
        else if (!EMAIL_REGEX.test(MAIL_USERNAME))
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else {
            updateChannelApi.request(
                alias,
                name,
                description,
                MAIL_USERNAME,
                MAIL_PASSWORD,
                MAIL_FROM,
                MAIL_PORT,
                MAIL_SERVER,
                USE_CREDENTIALS,
                MAIL_STARTTLS,
                MAIL_SSL_TLS,
                localStorage.getItem("token")
            );
        }
    };

    useEffect(() => {
        if (!updateChannelApi.loading) {
            if (updateChannelApi.data !== null) {
                toast.success(`${updateChannelApi.data}`, TOAST_CONFIG);
            } else if (updateChannelApi.error !== "") {
                toast.error(`${updateChannelApi.error}`, TOAST_CONFIG);
            }
        }
    }, [updateChannelApi.loading]);

    return (
        <div>
            {data && (
                <ChannelFormComponent
                    data={data}
                    onClickFunction={handleSubmit}
                    buttonLabel={"UPDATE CHANNEL"}
                />
            )}
        </div>
    );
};

export default EditChannelContainer;
