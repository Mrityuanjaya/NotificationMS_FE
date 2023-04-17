import client from "services/client";

const getRecipients = () => client.get("/recipients");
const postRecipients = () => client.post("/recipients");
export default {
    getRecipients,
    postRecipients,
};
