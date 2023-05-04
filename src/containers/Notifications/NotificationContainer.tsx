import { TableComponent } from "components";
import { NOTIFICATIONS_PER_PAGE } from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import notificationsApi from "services/request";
import { useAppSelector } from "store/hooks";

function NotificationContainer() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const [currentPage, setCurrentPage] = useState(
        searchParams.get("page_no") == null
            ? 1
            : Number(searchParams.get("page_no"))
    );
    const [totalPages, setTotalPages] = useState(1);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);

    const getNotificationsApi = useApi(notificationsApi.getNotificationsList);

    const headingFields = {
        id: "ID",
        recipient_email: "Recipient's Email",
        status: "Status",
        type: "Channel Type",
        created_at: "Sending Time",
    };
    const [data, setData] = useState<{ [key: string]: any }>({});

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    useEffect(() => {
        getNotificationsApi.request(
            searchParams.get("request_id"),
            localStorage.getItem("token"),
            currentPage,
            NOTIFICATIONS_PER_PAGE
        );
    }, [currentPage]);

    useEffect(() => {
        if (getNotificationsApi.data != null) {
            for (let notification of getNotificationsApi.data.notifications) {
                const date = new Date(
                    notification["created_at"]
                ).toLocaleDateString();
                const time = new Date(
                    notification["created_at"]
                ).toLocaleTimeString();
                notification["created_at"] = date + " " + time;
            }
            setData(getNotificationsApi.data);
            navigate(
                `${ROUTES.NOTIFICATIONS_ROUTE}?request_id=${searchParams.get(
                    "request_id"
                )}&page_no=${currentPage}`
            );
            setTotalPages(
                Math.ceil(
                    getNotificationsApi.data.total_notifications /
                        NOTIFICATIONS_PER_PAGE
                )
            );
        }
    }, [getNotificationsApi.loading]);

    return (
        <>
            <div>
                {data != null && data.notifications != null && (
                    <TableComponent
                        headingFields={headingFields}
                        dataFields={data.notifications}
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

export default NotificationContainer;
