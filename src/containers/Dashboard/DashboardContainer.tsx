import { LineChart, Piechart } from "components";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardApi from "services/dashboard";
import { useAppSelector } from "store/hooks";

function DashboardContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    const getDashboardApi = useApi(dashboardApi.getdashboard);
    const getTotalRecipientsApi = useApi(dashboardApi.getTotalRecipient);
    const now = new Date();
    const [startDate, setStartDate] = useState(
        new Date(
            now.getFullYear(),
            now.getMonth() - 2,
            now.getDate(),
            0,
            0,
            0,
            0
        )
    );
    const [endDate, setEndDate] = useState(new Date());
    const [applicationId, setApplicationId] = useState(0);

    useEffect(() => {
        getDashboardApi.request(
            applicationId,
            startDate,
            endDate,
            localStorage.getItem("token")
        );
        getTotalRecipientsApi.request(
            applicationId,
            localStorage.getItem("token")
        );
    }, []);

    let total_recipient = 0;
    const data = [];
    let total_notification = 0;
    let total_failure_notification = 0;
    let total_success_notification = 0;
    const dataNew = [];
    const dataToShow = getDashboardApi.data;
    if (getDashboardApi.data != null) {
        if (dataToShow != null) {
            for (let idx in dataToShow["response"]) {
                const dateTime = dataToShow["response"][idx]["created_at"];
                const dateToShow = dateTime.slice(0, 10);
                const timeToShow = dateTime.slice(11, 19);
                dataNew.push({
                    total: dataToShow["response"][idx]["total_request"],
                    failure: dataToShow["response"][idx]["response"]["failure"],
                    success: dataToShow["response"][idx]["response"]["success"],
                    time: dateToShow + " " + timeToShow,
                });
            }

            data.push({
                name: "Total Success",
                value: dataToShow["total_success"],
            });
            data.push({
                name: "Total Failure",
                value: dataToShow["total_failure"],
            });

            total_success_notification = dataToShow["total_success"];
            total_failure_notification = dataToShow["total_failure"];
            total_notification =
                total_success_notification + total_failure_notification;
        }
    }

    if (getTotalRecipientsApi.data != null) {
        total_recipient = getTotalRecipientsApi.data;
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="styling text-center">
                    <h2 className="mb-5 display-1">{total_notification}</h2>
                    <p>Total Notification</p>
                </div>
                <div className="styling text-center">
                    <h2 className="mb-5 display-1">
                        {total_success_notification}
                    </h2>
                    <p>Success Notification</p>
                </div>
                <div className="styling text-center">
                    <h2 className="mb-5 display-1">
                        {total_failure_notification}
                    </h2>
                    <p>Failure Notification</p>
                </div>
                <div className="styling">Drop Down of Applications</div>
            </div>
            {getDashboardApi.data != null && (
                <div className="m-3 p-3">
                    <LineChart lineChartData={dataNew} />
                </div>
            )}
            <div className="d-flex justify-content-center">
                {getDashboardApi.data != null && (
                    <div className="m-3 p-3">
                        <Piechart pieChartData={data} />
                    </div>
                )}
                <div className="styling m-5 text-center">
                    <h2 className="m-5 display-1">{total_recipient}</h2>
                    <p>Total Recipients</p>
                </div>
            </div>
        </div>
    );
}


export default DashboardContainer;
