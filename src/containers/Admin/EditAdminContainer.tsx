import { EditAdminComponent } from "components";
import {
    EMAIL_REGEX,
    ERROR_MESSAGES,
    MAX_EMAIL_LENGTH,
    MAX_NAME_LENGTH,
    TOAST_CONFIG,
} from "constants/constants";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import inviteApi from "services/admins";

function EditAdminContainer() {
    const { user_id } = useParams();
    const [user, setUser] = useState();

    const getUserApi = useApi(inviteApi.getUser);
    const editUserApi = useApi(inviteApi.editUser);

    useEffect(() => {
        getUserApi.request(user_id, localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getUserApi.data !== null) {
            setUser(getUserApi.data);
        }
    }, [getUserApi.loading]);

    const editUser = async (name: string, email: string, role: number) => {
        if (name.length === 0)
            toast.error(ERROR_MESSAGES.NAME_REQUIRED, TOAST_CONFIG);
        else if (name.length > MAX_NAME_LENGTH)
            toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
        else if (email.length === 0)
            toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
        else if (email.length > MAX_EMAIL_LENGTH)
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else if (!EMAIL_REGEX.test(email))
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else {
            editUserApi.request(
                user_id,
                name,
                email,
                role,
                localStorage.getItem("token")
            );
        }
    };

    useEffect(() => {
        if (!editUserApi.loading) {
            if (editUserApi.data !== null) {
                toast.success(`${editUserApi.data}`, TOAST_CONFIG);
            } else if (editUserApi.error !== "") {
                toast.error(`${editUserApi.error}`, TOAST_CONFIG);
            }
        }
    }, [editUserApi.loading]);
    return (
        <div>
            {user && (
                <EditAdminComponent user={user} onClickFunction={editUser} />
            )}
        </div>
    );
}
export default EditAdminContainer;
