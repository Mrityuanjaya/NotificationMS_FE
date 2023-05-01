import client from "services/client";

const getdashboard= async (applicationId:number,startDate: Date , endDate:Date,token: string) => {
    const dashboard = client.get(`/dashboard/?application_id=${applicationId}&start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return dashboard;
};

const getTotalRecipient = async(applicationId: number, token: string) => {
    const totalRecipient = client.get(`/total_recipients/?application_id=${applicationId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return totalRecipient;
}

export default {getdashboard,getTotalRecipient} ;
