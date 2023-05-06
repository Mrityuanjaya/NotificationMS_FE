import { LineChart, Piechart } from "components";
import { ERROR_MESSAGES, TOAST_CONFIG } from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import applicationApi from "services/application";
import dashboardApi from "services/dashboard";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

import Dropdown from "components/Dropdown/DropdownComponent";

function DashboardContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    if (!loginStatus && !loadingStatus)
        navigate(ROUTES.LOGIN_ROUTE);

    const getDashboardApi = useApi(dashboardApi.getdashboard);
    const getTotalRecipientsApi = useApi(dashboardApi.getTotalRecipient);
    const getApplicationListApi = useApi(applicationApi.getApplicationList);

    const now = new Date();
    const [startDate, setStartDate] = useState<Date | null>(
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
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [applicationId, setApplicationId] = useState(0);
    const [applications, setApplications] = useState({});
    const [dataToShow, setData] = useState<{ [key: string]: any }>();
    const [totalRecipient, setTotalRecipient] = useState(0);

    const getNotifications = (id:number) => {
        if (startDate != null && endDate != null && startDate > endDate)
            toast.error(
                ERROR_MESSAGES.START_DATE_GREATER_THAN_END_DATE,
                TOAST_CONFIG
            );
        else if (startDate == null && endDate != null) {
            toast.error("please provide start Date", TOAST_CONFIG);
        } else {
            getDashboardApi.request(
                id,
                startDate,
                endDate,
                localStorage.getItem("token")
            );
            getTotalRecipientsApi.request(
                id,
                localStorage.getItem("token")
            );
        }
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
            getNotifications(Number(id));
        }
    }, [getApplicationListApi.data]);

    useEffect(() => {
        if (getDashboardApi.data != null) {
            setData(getDashboardApi.data);
        }
    }, [getDashboardApi.loading]);
    
    const data = [];
    let total_notification = 0;
    let total_failure_notification = 0;
    let total_success_notification = 0;
    const dataNew = [];
    if (dataToShow != null) {
        for (let idx in dataToShow["response"]) {
            let dateTime = dataToShow["response"][idx]["created_at"];
            let dateToShow = (new Date(dateTime)).toLocaleDateString()
            let timeToShow = (new Date(dateTime)).toLocaleTimeString()
            dataNew.push({
                total: dataToShow["response"][idx]["total_recipients"],
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
    useEffect(()=>{
        if (getTotalRecipientsApi.data != null) {
            setTotalRecipient(getTotalRecipientsApi.data);
        }
    }, [getTotalRecipientsApi.loading])
    return (
        <div>
            <div className="m-3 p-3 d-flex justify-content-center">
                <div className="dashboard-input">
                    <div className="label">Applications</div>
                    <div className="filter-box">
                        <Dropdown
                            initialValue={applicationId}
                            options={applications}
                            onSelect={(value: number) =>
                                setApplicationId(value)
                            }
                        />
                    </div>
                </div>
                <div className="dashboard-input">
                    <div className="label">Start Date</div>
                    <DateTimePicker
                        className="filter-box"
                        onChange={(date: Date | null): void =>
                            setStartDate(date)
                        }
                        value={startDate}
                        maxDate={new Date()}
                    />
                </div>
                <div className="dashboard-input">
                    <div className="label">End Date</div>
                    <DateTimePicker
                        className="filter-box"
                        onChange={(date: Date | null): void => setEndDate(date)}
                        value={endDate}
                        maxDate={new Date()}
                    />
                </div>
                <button className="button" onClick={()=>getNotifications(applicationId)}>
                    APPLY
                </button>
            </div>
            <div className="d-flex justify-content-center">
                <div className="styling text-center">
                    <h2 className="mb-5 display-1">{total_notification}</h2>
                    <p>Total Notification</p>
                </div>
                <div className="styling text-center text-success">
                    <h2 className="mb-5 display-1">
                        {total_success_notification}
                    </h2>
                    <p>Success Notification</p>
                </div>
                <div className="styling text-center text-danger">
                    <h2 className="mb-5 display-1">
                        {total_failure_notification}
                    </h2>
                    <p>Failed Notification</p>
                </div>
            </div>
            {getDashboardApi.data != null && (
                <div>
                    <LineChart lineChartData={dataNew} />
                </div>
            )}
            <div className="d-flex justify-content-center">
                {getDashboardApi.data != null && (
                    <div className="m-3 p-3 ">
                        <Piechart pieChartData={data} />
                    </div>
                )}
                <div className="styling m-5 text-center">
                    <h2 className="m-5 display-1">{totalRecipient}</h2>
                    <p>Total Recipients</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardContainer;
