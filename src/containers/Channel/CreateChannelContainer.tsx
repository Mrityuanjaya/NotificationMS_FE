import { InviteFormComponent } from "components";
import {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    MAX_EMAIL_LENGTH,
    MAX_NAME_LENGTH,
    SUCCESS_MESSAGES,
    TOAST_CONFIG,
} from "constants/constants";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import applicationApi from "services/application";
import channelsApi from "services/channel";

import ChannelFormComponent from "components/ChannelForm/ChannelFormComponent";

const CreateChannelContainer = () => {
    const getApplicationApi = useApi(applicationApi.getApplicationList);
    const postChannelApi = useApi(channelsApi.postChannel);
    const [applicationId, setApplicationId] = useState<number>(0);
    const [applications, setApplications] = useState({});
    useEffect(() => {
        getApplicationApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getApplicationApi.data !== null) {
            const applications = getApplicationApi.data.applications;
            let options: { [x: number]: string } = {};
            applications.map((application: { [x: string]: any }) => {
                options[application["id"]] = application["name"];
            });
            setApplications(options);
            setApplicationId(Number(Object.keys(options)[0]));
        }
    }, [getApplicationApi.loading]);

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
            postChannelApi.request(
                applicationId,
                name,
                alias,
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
        if (!postChannelApi.loading) {
            if (postChannelApi.data !== null) {
                toast.success(`${postChannelApi.data}`, TOAST_CONFIG);
            } else if (postChannelApi.error !== "") {
                toast.error(`${postChannelApi.error}`, TOAST_CONFIG);
            }
        }
    }, [postChannelApi.loading]);

    return (
        <div className="d-flex display-content-center">
            {getApplicationApi.data !== null && applicationId > 0 && (
                <ChannelFormComponent
                    applicationId={applicationId}
                    applications={applications}
                    onClickFunction={handleSubmit}
                    buttonLabel={"CREATE CHANNEL"}
                />
            )}
        </div>
    );
};

export default CreateChannelContainer;
