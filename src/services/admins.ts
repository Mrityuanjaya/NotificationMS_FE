import client from "services/client";

const getAdmins = () => client.get("/admins");
const inviteUser = async (username: string, email: string, applicationId: string) => {
    const form_data = new FormData();
    form_data.append("username", username);
    form_data.append("email", email);
    form_data.append("applicationId",applicationId);
    const status = client.post("/invites", form_data);
    return status;
};

const verifyCode = async (token: string) => {
    const status = client.post(`/verify/${token}`);
    return status;
};
export default { getAdmins, inviteUser, verifyCode };
