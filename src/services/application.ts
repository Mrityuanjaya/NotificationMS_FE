import client from "services/client";

const getApplications = () => client.get("/applications");
const postApplications = () => client.post("/applications", {});
export default { getApplications, postApplications };
