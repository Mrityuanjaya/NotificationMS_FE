import client from "services/client";

const getAdmins = () => client.get("/admins");
const postAdmins = () => client.post("/admins", {});
export default { getAdmins, postAdmins };
