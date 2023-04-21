import client from "services/client";
import ROUTES from "constants/routes"

const getAdmins = () => client.get(ROUTES.ADMIN_ROUTE);

const inviteUser = async (username: string, email: string, applicationId: string, token: string) => {

    const status = client.post(ROUTES.INVITE_ROUTE, 
        {
        name: username,
        email: email,
        application_id:applicationId}, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, );
    return status;
};

const verifyCode = async (token: string) => {
    const status = client.patch(`/verify?invitation_code=${token}`);
    return status;
};

export default { getAdmins, inviteUser, verifyCode };

