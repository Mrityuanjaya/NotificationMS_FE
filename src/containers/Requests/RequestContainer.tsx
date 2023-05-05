import { TableComponent } from "components";
import { REQUESTS_PER_PAGE } from "constants/constants";
import ROUTES from "constants/routes";
import routes from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import applicationApi from "services/application";
import requestApi from "services/request";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

import Dropdown from "components/Dropdown/DropdownComponent";

function RequestContainer() {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        searchParams.get("page_no") == null || Number(searchParams.get("page_no")) <= 0
            ? 1
            : Number(searchParams.get("page_no"))
    );
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const getRequestsApi = useApi(requestApi.getRequests);
    const getApplicationListApi = useApi(applicationApi.getApplicationList);

    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);

    const [applicationId, setApplicationId] = useState(0);
    const [applications, setApplications] = useState({});
    const [data, setData] = useState<{ [key: string]: any }>({});

    const headingFields = {
        subject: "Subject",
        priority: "Priority",
        total_recipients: "Total Recipients",
        success: "Success Count",
        failure: "Failure Count",
        created_at: "Recieving Time",
    };

    const getRequests = (id: number) => {
        getRequestsApi.request(
            id,
            localStorage.getItem("token"),
            currentPage,
            REQUESTS_PER_PAGE
        );
        setApplicationId(id);
    };

    useEffect(() => {
        getApplicationListApi.request(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getApplicationListApi.data) {
            const applications = getApplicationListApi.data.applications;
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
    }, [getApplicationListApi.data]);

    useEffect(() => {
        getRequests(applicationId);
    }, [currentPage]);

    useEffect(() => {
        if (getRequestsApi.data != null) {
            for (let request of getRequestsApi.data.requests) {
                const date = new Date(
                    request["created_at"]
                ).toLocaleDateString();
                const time = new Date(
                    request["created_at"]
                ).toLocaleTimeString();
                request["created_at"] = date + " " + time;
            }
            setData(getRequestsApi.data);
            navigate(`${routes.REQUESTS_ROUTE}?page_no=${currentPage}`);
            setTotalPages(
                Math.ceil(
                    getRequestsApi.data.total_requests / REQUESTS_PER_PAGE
                )
            );
        }
    }, [getRequestsApi.loading]);

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

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
                {data != null && data.requests && (
                    <TableComponent
                        headingFields={headingFields}
                        dataFields={data.requests}
                        viewFunction={redirectToNotificationsPage}
                        viewFunctionArgs={["id"]}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        nextFunction={handleNextClick}
                        prevFunction={handlePrevClick}
                    />
                )}
            </div>
        </>
    );
}

export default RequestContainer;
