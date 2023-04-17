import client from "services/client";

const getChannels = () => client.get("/channels");
const postChannels = () => client.post("/channels", {});
export default { getChannels, postChannels };
