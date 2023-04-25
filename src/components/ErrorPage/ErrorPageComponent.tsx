import { ErrorProps } from "components/ErrorPage/types";
export default function ErrorPage(props: ErrorProps) {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">{props.status}</h1>
                <p className="fs-3 text-danger">
                    Oops!
                </p>
                <p className="lead">{props.message}</p>
            </div>
        </div>
    );
}
