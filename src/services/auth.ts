import client from "services/client";

const loginUser = async (username:string, password:string) => {
    const form_data = new FormData();
    form_data.append("username", username);
    form_data.append("password", password);
    return client.post("/login", form_data);
}
export default { loginUser };