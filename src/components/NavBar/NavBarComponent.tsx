import ROUTES from "constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginStatus } from "store/slices/userSlice";

function NavBar() {
    const dispatch = useAppDispatch();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.clear();
        dispatch(setLoginStatus(false));
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Notification MS
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        {systemAdminStatus && (
                            <Link className="nav-link" to={ROUTES.ADMIN_ROUTE}>
                                Admins
                            </Link>
                        )}
                        <Link className="nav-link" to={ROUTES.DASHBOARD_ROUTE}>
                            Dashboard
                        </Link>
                        <Link className="nav-link" to={ROUTES.CHANNELS_ROUTE}>
                            Channels
                        </Link>
                        <Link className="nav-link" to={ROUTES.NOTIFICATIONS_ROUTE}>
                            Notifications
                        </Link>
                        <Link className="nav-link" to={ROUTES.RECIPIENTS_ROUTE}>
                            Recipients
                        </Link>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-light mx-3 py-2"
                    onClick={logoutUser}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
