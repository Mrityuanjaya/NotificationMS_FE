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

    const { alias } = useParams();
    const getChannelApi = useApi(channelsApi.getChannel);
    const updateChannelApi = useApi(channelsApi.updateChannel);
    const [data, setData] = useState();
    const [viewMode, setViewMode] = useState(true);
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
        configuration: {}
    ) => {
        if (viewMode) {
            setViewMode(false);
            return;
        }
        if (name.length === 0)
            toast.error(ERROR_MESSAGES.NAME_REQUIRED, TOAST_CONFIG);
        else if (name.length > MAX_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
        else if (alias.length > MAX_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
        else {
            updateChannelApi.request(
                alias,
                name,
                description,
                configuration,
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
                    buttonLabel={viewMode ? "Edit" : "UPDATE CHANNEL"}
                    viewMode={viewMode}
                    isButtonVisible={systemAdminStatus}
                />
            )}
        </div>
    );
};

export default EditChannelContainer;
