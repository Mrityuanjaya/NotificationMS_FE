import ROUTES from "constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

function AdminContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    if (!loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    else if (!systemAdminStatus) navigate(ROUTES.DASHBOARD_ROUTE);
    return (
        <div className="d-flex justify-content-center">
            <Link className="button" to={ROUTES.INVITE_ROUTE}>
                Invite Admins
            </Link>
        </div>
    );
}

export default AdminContainer;
