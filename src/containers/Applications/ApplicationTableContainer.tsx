import { TableComponent } from "components";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import applicationApi from "services/application";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

function ApplicationTableContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const getApplicationApi = useApi(applicationApi.getapplicationList);
    const [applications, setApplications] = useState([]);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );

    if (!loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!systemAdminStatus) navigate(ROUTES.DASHBOARD_ROUTE);

    const headingFields = ["id", "name"];

    useEffect(() => {
        getApplicationApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getApplicationApi.data !== null) {
            setApplications(getApplicationApi.data);
        }
    }, [getApplicationApi.loading]);

    return (
        <>
            <div className="d-flex justify-content-center">
                <Link className="button" to={ROUTES.APPLICATIONS_ROUTE}>
                    Add Applications
                </Link>
            </div>
            <div>
                <TableComponent
                    headingFields={headingFields}
                    dataFields={applications}
                />
            </div>
        </>
    );
}

export default ApplicationTableContainer;
