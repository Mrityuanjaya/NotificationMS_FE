import {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    TOAST_CONFIG,
} from "constants/constants";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import inviteApi from "services/admins";

import InviteFormComponent from "components/InviteForm/InviteFormComponent";
import LoaderComponent from "components/Loader/loader";

const InviteFormContainer = () => {
    const postInviteApi = useApi(inviteApi.inviteUser);

    async function handleClick(
        name: string,
        email: string,
        applicationId: string
    ) {
        if (name.length === 0)
            toast.error(ERROR_MESSAGES.NAME_REQUIRED, TOAST_CONFIG);
        else if (email.length === 0)
            toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
        else if (applicationId.length === 0)
            toast.error(ERROR_MESSAGES.APPLICATION_ID_REQUIRED, TOAST_CONFIG);
        else if (!EMAIL_REGEX.test(email))
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else {
            const token = localStorage.getItem("token");
            await postInviteApi.request(name, email, applicationId, token);
        }
    }
    useEffect(() => {
        if (!postInviteApi.loading) {
            if (postInviteApi.data !== null) {
                toast.success(`${postInviteApi.data}`, TOAST_CONFIG);
            } else if (postInviteApi.error !== "") {
                toast.error(`${postInviteApi.error}`, TOAST_CONFIG);
            }
        }
    }, [postInviteApi.loading]);

    postInviteApi.loading && <LoaderComponent />;
    return <InviteFormComponent onClickFunction={handleClick} />;
};

export default InviteFormContainer;
