import { TableComponent } from "components";
import { ADMINS_PER_PAGE, SUCCESS_MESSAGES } from "constants/constants";
import { TOAST_CONFIG } from "constants/constants";
import ROUTES from "constants/routes";
import routes from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import inviteApi from "services/admins";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

function AdminContainer() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const getAllAdminsApi = useApi(inviteApi.getAllAdmins);
    const deleteUserApi = useApi(inviteApi.deleteUser);
    const [currentPage, setCurrentPage] = useState(
        searchParams.get("page_no") == null
            ? 1
            : Number(searchParams.get("page_no"))
    );
    const [totalPages, setTotalPages] = useState(1);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );

    const headingFields = {
        name: "Name",
        email: "Email",
        application_name: "Application Name",
        status: "Status",
        is_active: "Is Active",
    };

    const getAllAdmins = async () => {
        await getAllAdminsApi.request(
            localStorage.getItem("token"),
            currentPage,
            ADMINS_PER_PAGE
        );
    };

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    useEffect(() => {
        getAllAdminsApi.request(
            localStorage.getItem("token"),
            currentPage,
            ADMINS_PER_PAGE
        );
    }, [currentPage]);

    useEffect(() => {
        if (getAllAdminsApi.data !== null) {
            navigate(`${routes.ADMIN_ROUTE}?page_no=${currentPage}`);
            setTotalPages(
                Math.ceil(getAllAdminsApi.data.total_admins / ADMINS_PER_PAGE)
            );
            toast.success(
                SUCCESS_MESSAGES.ADMIN_FETCHED_SUCCESSFUL,
                TOAST_CONFIG
            );
        } else if (!getAllAdminsApi.loading && getAllAdminsApi.error != "")
            toast.error(getAllAdminsApi.error, TOAST_CONFIG);
    }, [getAllAdminsApi.loading]);

    const deleteInvitation = async (
        user_id: number,
        application_id: number
    ) => {
        await deleteUserApi.request(
            user_id,
            application_id,
            localStorage.getItem("token")
        );
        await getAllAdmins();
    };

    useEffect(() => {
        if (!deleteUserApi.loading) {
            if (deleteUserApi.data !== null) {
                toast.success(`${deleteUserApi.data}`, TOAST_CONFIG);
            } else if (deleteUserApi.error !== "") {
                toast.error(`${deleteUserApi.error}`, TOAST_CONFIG);
            }
        }
    }, [deleteUserApi.loading]);

    const redirectToEditPage = async (user_id: number) => {
        navigate(ROUTES.EDIT_ADMIN_ROUTE.replace(":user_id", String(user_id)));
    };

    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!loadingStatus && !systemAdminStatus)
        navigate(ROUTES.DASHBOARD_ROUTE);

    return (
        <>
            <div className="d-flex justify-content-end">
                <Link className="button" to={ROUTES.INVITE_ROUTE}>
                    Invite Admins
                </Link>
            </div>
            {getAllAdminsApi.data && getAllAdminsApi.data.admins && (
                <TableComponent
                    headingFields={headingFields}
                    dataFields={getAllAdminsApi.data.admins}
                    deleteFunction={deleteInvitation}
                    editFunction={redirectToEditPage}
                    deleteFunctionArgs={["user_id", "application_id"]}
                    editFunctionArgs={["user_id"]}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    nextFunction={handleNextClick}
                    prevFunction={handlePrevClick}
                />
            )}
        </>
    );
}

export default AdminContainer;
