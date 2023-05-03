import { TableComponent } from "components";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import notifcationsApi from "services/request";
import { useAppSelector } from "store/hooks";

function NotificationConainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!loadingStatus && !systemAdminStatus)
        navigate(ROUTES.DASHBOARD_ROUTE);

    const getNotificationsApi = useApi(notifcationsApi.getNotificationsList);

    const [searchParams] = useSearchParams();
    const request_id = searchParams.get("request_id");

    const headingFields = [
        "id",
        "recipient_id",
        "status",
        "type",
        "created_at",
    ];
    const [data, setData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        getNotificationsApi.request(request_id, localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (getNotificationsApi.data !== null) {
            setData(getNotificationsApi.data);
        }
    }, [getNotificationsApi.loading]);

    return (
        <>
            <div>
                {getNotificationsApi.data != null && (
                    <TableComponent
                        headingFields={headingFields}
                        dataFields={getNotificationsApi.data}
                    />
                )}
            </div>
        </>
    );
}

export default NotificationConainer;
