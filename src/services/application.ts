import client from "services/client";
import ROUTES from "constants/routes"

const getapplicationList= async () => {
    const applicationList = client.get(ROUTES.APPLICATIONS_ROUTE);
    return applicationList;
};

const postApplications = async (username: string, token: string) => {

    const status = client.post(ROUTES.APPLICATIONS_ROUTE, 
        {
        name: username}, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, );
    return status;
};

export default { getapplicationList, postApplications };
