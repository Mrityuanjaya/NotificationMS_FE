import client from "services/client";

const getNotificationsList= async (requestId: string, token: string, page_no:number=1, records_per_page: number=100) => {
    const notificationList = client.get(`/notifications?request_id=${requestId}&page_no=${page_no}&records_per_page=${records_per_page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return notificationList;
};

const getRequests = async (applicationId: number, token: string, page_no: number, records_per_page:number) => {
    return client.get(`/requests?application_id=${applicationId}&page_no=${page_no}&records_per_page=${records_per_page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}



const postNotifications = () => client.post("/notifications", {});
export default { getNotificationsList, getRequests };
