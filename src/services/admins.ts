import ROUTES from "constants/routes";
import client from "services/client";

const getAllAdmins = async (
    token: string,
    page_no: number,
    records_per_page: number
) =>
    client.get(`${ROUTES.ADMIN_ROUTE}?page_no=${page_no}&records_per_page=${records_per_page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

const getUser = async (user_id: number, token: string) => {
    const URL = ROUTES.USER_ROUTE.replace(":user_id", user_id.toString());
    const status = client.get(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return status;
};
const inviteUser = async (
    username: string,
    email: string,
    applicationId: string,
    token: string
) => {
    const status = client.post(
        ROUTES.INVITE_ROUTE,
        {
            name: username,
            email: email,
            application_id: applicationId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return status;
};

const verifyCode = async (token: string) => {
    const status = client.patch(`/verify?invitation_code=${token}`);
    return status;
};
const editUser = async (
    user_id: number,
    name: string,
    email: string,
    role: number,
    token: string
) => {
    const URL = ROUTES.USER_ROUTE.replace(":user_id", user_id.toString());
    const status = client.put(
        URL,
        {
            name: name,
            email: email,
            role: role,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return status;
};

const deleteUser = async (
    user_id: number,
    application_id: number,
    token: string
) => {
    const URL =
        ROUTES.USER_ROUTE.replace(":user_id", user_id.toString()) +
        `?application_id=${application_id}`;
    const status = client.delete(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return status;
};

export default {
    getAllAdmins,
    inviteUser,
    verifyCode,
    getUser,
    editUser,
    deleteUser,
};
