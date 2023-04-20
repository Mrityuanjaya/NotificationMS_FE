import ROUTES from "constants/routes";
import { Link } from "react-router-dom";
import "styles/styles.css";

function AdminContainer() {
  return (
    <div className="d-flex justify-content-center">
      <Link className="button" to={ROUTES.INVITE_ROUTE}>
        Invite Admins
      </Link>
    </div>
  );
}

export default AdminContainer;
