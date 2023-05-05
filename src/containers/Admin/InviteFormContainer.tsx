import { InviteFormComponent } from "components";
import {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    MAX_EMAIL_LENGTH,
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    TOAST_CONFIG,
} from "constants/constants";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import inviteApi from "services/admins";
import applicationApi from "services/application";

const InviteFormContainer = () => {
    const getApplicationApi = useApi(applicationApi.getApplicationList);
    const postInviteApi = useApi(inviteApi.inviteUser);

    async function handleClick(
        name: string,
        email: string,
        applicationId: number
    ) {
        if (name.length === 0)
            toast.error(ERROR_MESSAGES.NAME_REQUIRED, TOAST_CONFIG);
        else if (name.length > MAX_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
        else if (name.length < MIN_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_TOO_SHORT, TOAST_CONFIG);
        else if (email.length === 0)
            toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
        else if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH)
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else
        {
            email = email.toLowerCase()
            await postInviteApi.request(
                name,
                email,
                applicationId,
                localStorage.getItem("token")
            );
        }
    }

    useEffect(() => {
        getApplicationApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (!postInviteApi.loading) {
            if (postInviteApi.data !== null) {
                toast.success(`${postInviteApi.data}`, TOAST_CONFIG);
            } else if (postInviteApi.error !== "") {
                toast.error(`${postInviteApi.error}`, TOAST_CONFIG);
            }
        }
    }, [postInviteApi.loading]);

    return (
        <div>
            {getApplicationApi.data !== null && (
                <InviteFormComponent
                    onClickFunction={handleClick}
                    options={getApplicationApi.data.applications}
                />
            )}
        </div>
    );
};

export default InviteFormContainer;
