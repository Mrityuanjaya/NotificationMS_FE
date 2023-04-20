import LoaderComponent from "components/Loader/loader";
import { useAppSelector } from "store/hooks";

export default function ErrorPage(props: ErrorProps) {
    const loadingStatus = useAppSelector((state)=>state.user.loadingStatus);
    if(loadingStatus)
    return <LoaderComponent/>
    else
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
