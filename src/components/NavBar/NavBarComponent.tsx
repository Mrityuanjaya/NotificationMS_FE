import ROUTES from "constants/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginStatus, setSystemAdminStatus } from "store/slices/userSlice";

function NavBar() {
    const dispatch = useAppDispatch();
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const navigate = useNavigate();
    const activeLink = useLocation().pathname;
    const edit_admin_pattern = /edit\/(\d+)/;
    const edit_channel_pattern = /\/channel\/.*/;
    const logoutUser = () => {
        localStorage.clear();
        dispatch(setLoginStatus(false));
        dispatch(setSystemAdminStatus(false));
        navigate(ROUTES.LOGIN_ROUTE);
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
                        <Link
                            className={`nav-link ${
                                activeLink === ROUTES.DASHBOARD_ROUTE &&
                                "active"
                            }`}
                            to={ROUTES.DASHBOARD_ROUTE}
                        >
                            Dashboard
                        </Link>
                        {systemAdminStatus && (
                            <Link
                                className={`nav-link ${
                                    (activeLink === ROUTES.ADMIN_ROUTE ||
                                        activeLink === ROUTES.INVITE_ROUTE ||
                                        edit_admin_pattern.test(activeLink)) &&
                                    "active"
                                }`}
                                to={ROUTES.ADMIN_ROUTE}
                            >
                                Admins
                            </Link>
                        )}

                        <Link
                            className={`nav-link ${
                                (activeLink ===
                                    ROUTES.APPLICATIONSTABLE_ROUTE ||
                                    activeLink === ROUTES.APPLICATIONS_ROUTE) &&
                                "active"
                            }`}
                            to={ROUTES.APPLICATIONSTABLE_ROUTE}
                        >
                            Applications
                        </Link>
                        <Link
                            className={`nav-link ${
                                (activeLink === ROUTES.CHANNELS_ROUTE ||
                                    activeLink ===
                                        ROUTES.CREATE_CHANNEL_ROUTE ||
                                    edit_channel_pattern.test(activeLink)) &&
                                "active"
                            }`}
                            to={ROUTES.CHANNELS_ROUTE}
                        >
                            Channels
                        </Link>
                        <Link
                            className={`nav-link ${
                                (activeLink === ROUTES.REQUESTS_ROUTE ||
                                    activeLink ===
                                        ROUTES.NOTIFICATIONS_ROUTE) &&
                                "active"
                            }`}
                            to={ROUTES.REQUESTS_ROUTE}
                        >
                            Requests
                        </Link>
                        <Link
                            className={`nav-link ${
                                activeLink === ROUTES.RECIPIENTS_ROUTE &&
                                "active"
                            }`}
                            to={ROUTES.RECIPIENTS_ROUTE}
                        >
                            Recipients
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="btn btn-light mx-3 py-2 float-end"
                        onClick={logoutUser}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
