import client from "services/client";

const getAdmins = () => client.get("/admins");

const inviteUser = async (username: string, email: string, applicationId: string, token: string) => {

    const status = client.post("/invite", 
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
