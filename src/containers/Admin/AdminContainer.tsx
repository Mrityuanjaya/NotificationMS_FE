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
    const getAllAdminsApi = useApi(inviteApi.getAllAdmins);
    const deleteUserApi = useApi(inviteApi.deleteUser);
    const [admins, setAdmins] = useState([]);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );

    if (!loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!systemAdminStatus) navigate(ROUTES.DASHBOARD_ROUTE);

    const headingFields = [
        "name",
        "email",
        "application_name",
        "status",
        "is_active",
    ];

    const getAllAdmins = async () => {
        console.log("hello");
        await getAllAdminsApi.request(localStorage.getItem("token"));
    };

    useEffect(() => {
        getAllAdmins();
    }, []);

    useEffect(() => {
        if (getAllAdminsApi.data !== null) {
            console.log(getAllAdminsApi.data);
            setAdmins(getAllAdminsApi.data);
        }
    }, [getAllAdminsApi.loading]);

    const deleteInvitation = async (
        user_id: number,
        application_id: number
    ) => {
        console.log(user_id);
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
