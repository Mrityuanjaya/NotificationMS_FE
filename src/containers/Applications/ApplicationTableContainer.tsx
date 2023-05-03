import { TableComponent } from "components";
import { APPLICATIONS_PER_PAGE, SUCCESS_MESSAGES, TOAST_CONFIG } from "constants/constants";
import routes from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import applicationApi from "services/application";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

function ApplicationTableContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const getApplicationApi = useApi(applicationApi.getApplicationList);
    const [applications, setApplications] = useState([]);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        searchParams.get("page_no") == null
            ? 1
            : Number(searchParams.get("page_no"))
    );
    const [totalPages, setTotalPages] = useState(1);
    if (!loginStatus && !loadingStatus) navigate(routes.LOGIN_ROUTE);

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const headingFields = ["id", "name"];

    useEffect(() => {
        getApplicationApi.request(localStorage.getItem("token"), currentPage,
        APPLICATIONS_PER_PAGE);
    }, [currentPage]);

    useEffect(() => {
        if(!getApplicationApi.loading)
        {
            if (getApplicationApi.data !== null) {
                setApplications(getApplicationApi.data.applications);
                navigate(`${routes.APPLICATIONSTABLE_ROUTE}?page_no=${currentPage}`);
                setTotalPages(
                    Math.ceil(
                        getApplicationApi.data.total_applications /
                            APPLICATIONS_PER_PAGE
                    )
                );
                toast.success(
                    SUCCESS_MESSAGES.APPLICATION_FETCH_SUCCESSFUL,
                    TOAST_CONFIG
                );
            }
        }
    }, [getApplicationApi.loading]);

    return (
        <>
            <div className="d-flex justify-content-end">
                {systemAdminStatus && <Link className="button" to={routes.APPLICATIONS_ROUTE}>
                    Add Applications
                </Link>}
            </div>
            <div>
                <TableComponent
                    headingFields={headingFields}
                    dataFields={applications}
                    nextFunction={handleNextClick}
                    prevFunction={handlePrevClick}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </>
    );
}

export default ApplicationTableContainer;
