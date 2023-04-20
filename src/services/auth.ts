import client from "services/client";

const loginUser = async (username: string, password: string) => {
    const form_data = new FormData();
    form_data.append("username", username);
    form_data.append("password", password);
    const token = client.post("/login", form_data);
    return token;
};

const getSystemAdminStatus = async (token: string) => {
    return client.get(
        "/validate_system_admin",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export default { loginUser, getSystemAdminStatus };
