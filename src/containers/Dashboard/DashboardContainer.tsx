import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import ROUTES from "constants/routes"
function DashboardContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state)=>state.user.loginStatus);
    if(!loginStatus)
    navigate(ROUTES.LOGIN_ROUTE);
    return <div>DashboardContainer</div>;
}

export default DashboardContainer;
