import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    TOAST_CONFIG,
} from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRecipientApi from "services/recipients";
import { useAppSelector } from "store/hooks";

function RecipientContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const [file, setFile] = useState<File>();
    const postRecipientApi = useApi(useRecipientApi.postRecipients);
    const upload_recipients = () => {
        if (file !== undefined)
            postRecipientApi.request(file, localStorage.getItem("token"));
        else toast.error(ERROR_MESSAGES.NO_FILE_SELECTED, TOAST_CONFIG);
    };

    useEffect(() => {
        if (postRecipientApi.loading) {
            if (postRecipientApi.data !== null)
                toast.success(
                    SUCCESS_MESSAGES.RECIPIENTS_UPLOAD_SUCCESSFUL,
                    TOAST_CONFIG
                );
            else if (postRecipientApi.error !== "")
                toast.error(postRecipientApi.error, TOAST_CONFIG);
        }
    }, [postRecipientApi.loading]);

    const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        } else setFile(undefined);
    };
    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    return (
        <div className="mb-3">
            {systemAdminStatus && (
                <div className="mx-3 py-3 btn-group">
                    <label htmlFor="formFileLg">Upload Recipients</label>
                    <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        accept=".csv"
                        onChange={handleUploadChange}
                    />
                    <button
                        className="btn btn-dark btn-lg"
                        onClick={upload_recipients}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default RecipientContainer;
