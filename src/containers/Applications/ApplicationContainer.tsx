import ROUTES from "constants/routes";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

function ApplicationContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    if (!loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    return <div>ApplicationContainer</div>;
}

export default ApplicationContainer;
