import { HOME_ROUTE } from "constants/routes";
import { Link } from "react-router-dom";

type ErrorProps= {
    status: number;
    message: string;
}
export default function ErrorPage(props: ErrorProps) {
    return (
        
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">{props.status}</h1>
                <p className="fs-3">
                    {" "}
                    <span className="text-danger">Oops!</span>
                </p>
                <p className="lead">
                    {props.message}
                </p>
                <Link to={HOME_ROUTE} className="btn btn-primary">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
