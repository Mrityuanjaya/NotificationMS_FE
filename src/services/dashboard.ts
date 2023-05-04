import client from "services/client";

const getdashboard= async (applicationId:number,startDate: Date, endDate:Date,token: string) => {
    let sDate=startDate?"&start_date="+startDate.toISOString():"";
    let eDate=endDate?"&end_date="+endDate.toISOString():"";
    const dashboard = client.get(`/dashboard?application_id=${applicationId}${sDate}${eDate}`,{
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
