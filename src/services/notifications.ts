import client from "services/client";

const getNotifications = () => client.get("/notifications");
const postNotifications = () => client.post("/notifications", {});
export default { getNotifications, postNotifications };
