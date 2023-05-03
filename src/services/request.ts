import client from "services/client";

const getNotificationsList= async (requestId: string, token: string) => {
    const notificationList = client.get(`/notifications?request_id=${requestId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(requestId);
    return notificationList;
};




const postNotifications = () => client.post("/notifications", {});
export default { getNotificationsList, postNotifications };
