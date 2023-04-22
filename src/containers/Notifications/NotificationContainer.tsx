import ROUTES from "constants/routes";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

function NotificationContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    return <div>NotificationContainer</div>;
}

export default NotificationContainer;
