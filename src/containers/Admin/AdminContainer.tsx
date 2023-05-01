import { TableComponent } from "components";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import inviteApi from "services/admins";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

function AdminContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const getAllAdminsApi = useApi(inviteApi.getAllAdmins);
    const deleteUserApi = useApi(inviteApi.deleteUser);
    const [admins, setAdmins] = useState([]);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!loadingStatus && !systemAdminStatus)
        navigate(ROUTES.DASHBOARD_ROUTE);

    const headingFields = [
        "name",
        "email",
        "application_name",
        "status",
        "is_active",
    ];

    const getAllAdmins = async () => {
        await getAllAdminsApi.request(localStorage.getItem("token"));
    };

    useEffect(() => {
        getAllAdmins();
    }, []);

    useEffect(() => {
        if (getAllAdminsApi.data !== null) {
            setAdmins(getAllAdminsApi.data);
        }
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

    const redirectToEditPage = async (user_id: number) => {
        navigate(ROUTES.EDIT_ADMIN_ROUTE.replace(":user_id", String(user_id)));
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <Link className="button" to={ROUTES.INVITE_ROUTE}>
                    Invite Admins
                </Link>
            </div>
            <div>
                <TableComponent
                    headingFields={headingFields}
                    dataFields={admins}
                    deleteInvitation={deleteInvitation}
                    handleEdit={redirectToEditPage}
                />
            </div>
        </>
    );
}

export default AdminContainer;
