import client from "services/client";

const getRecipients = async () => client.get("/recipients");
const postRecipients = async(csv_file: File, token:string) => {
    const form_data = new FormData();
    form_data.append("csv_file", csv_file);
    return client.post("/upload/recipients", form_data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },);
}
export default {
    getRecipients,
    postRecipients,
};
