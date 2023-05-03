import { TableComponent } from "components";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import applicationApi from "services/application";
import dashboardApi from "services/dashboard";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

import Dropdown from "components/Dropdown/DropdownComponent";

function RequestContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const getRequestsApi = useApi(dashboardApi.getdashboard);
    const getApplicationListApi = useApi(applicationApi.getApplicationList);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!loadingStatus && !systemAdminStatus)
        navigate(ROUTES.DASHBOARD_ROUTE);

    const [applicationId, setApplicationId] = useState(0);
    const [applications, setApplications] = useState({});
    const [data, setData] = useState<{ [key: string]: any }>({});

    const headingFields = [
        "application_id",
        "id",
        "total_request",
        "priority",
        "created_at",
    ];

    const getRequests = (id: number) => {
        getRequestsApi.request(id, null, null, localStorage.getItem("token"));
        setApplicationId(id);
    };

    useEffect(() => {
        getApplicationListApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getApplicationListApi.data != null) {
            const applications = getApplicationListApi.data;
            let options: { [x: number]: string } = {};
            if (localStorage.getItem("systemAdminStatus") == "true")
                options[0] = "All";
            applications.map((application: { [x: string]: any }) => {
                options[application["id"]] = application["name"];
            });
            let id = Object.keys(options)[0];
            setApplicationId(Number(id));
            setApplications(options);
            getRequests(Number(id));
        }
    }, [getApplicationListApi.loading]);

    useEffect(() => {
        if (getRequestsApi.data != null) {
            setData(getRequestsApi.data);
        }
    }, [getRequestsApi.loading]);

    const redirectToNotificationsPage = async (request_id: string) => {
        navigate(`/notifications?request_id=${request_id}`);
    };

    return (
        <>
            <div className="d-flex justify-content-end">
                <div className="filter-box">
                    <Dropdown
                        initialValue={applicationId}
                        options={applications}
                        onSelect={(value: number) => getRequests(value)}
                    />
                </div>
            </div>
            <div>
                {data.response != null && (
                    <TableComponent
                        headingFields={headingFields}
                        dataFields={data.response}
                        viewFunction={redirectToNotificationsPage}
                        viewFunctionArgs={["id"]}
                    />
                )}
            </div>
        </>
    );
}

export default RequestContainer;
