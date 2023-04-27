import { RecipientComponent } from "components";
import {
    ERROR_MESSAGES,
    RECIPIENTS_PER_PAGE,
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

import TableComponent from "components/Table/TableComponent";

function RecipientContainer() {
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const [file, setFile] = useState<File>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Number);
    const postRecipientApi = useApi(useRecipientApi.postRecipients);
    const getRecipientApi = useApi(useRecipientApi.getRecipients);
    const uploadRecipients = () => {
        if (file !== undefined)
            postRecipientApi.request(file, localStorage.getItem("token"));
        else toast.error(ERROR_MESSAGES.NO_FILE_SELECTED, TOAST_CONFIG);
    };

    const handleNextClick = () => {
        setCurrentPage((pageNo) => pageNo + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((pageNo) => pageNo - 1);
    };

    useEffect(() => {
        getRecipientApi.request(localStorage.getItem("token"), currentPage, RECIPIENTS_PER_PAGE);
    }, [currentPage]);

    useEffect(() => {
        if (!getRecipientApi.loading) {
            if (getRecipientApi.data !== null) {
                setTotalPages(Math.ceil(getRecipientApi.data["total_recipients"]/RECIPIENTS_PER_PAGE));
                toast.success(
                    SUCCESS_MESSAGES.RECIPIENT_FETCH_SUCCESSFUL,
                    TOAST_CONFIG
                );
            } else if (getRecipientApi.error !== "") {
                toast.error(getRecipientApi.error, TOAST_CONFIG);
            }
        }
    }, [getRecipientApi.loading]);

    useEffect(() => {
        if (!postRecipientApi.loading) {
            if (postRecipientApi.data !== null)
            {
                toast.success(
                    SUCCESS_MESSAGES.RECIPIENTS_UPLOAD_SUCCESSFUL,
                    TOAST_CONFIG
                );
            }
            else if (postRecipientApi.error !== "")
                toast.error(postRecipientApi.error, TOAST_CONFIG);
        }
    }, [postRecipientApi.loading]);

    const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        } else setFile(undefined);
    };
    if (loadingStatus == false && loginStatus == false) navigate(ROUTES.LOGIN_ROUTE);
    return (
        <>
            <RecipientComponent
                handleUploadChange={handleUploadChange}
                uploadRecipients={uploadRecipients}
            />
            {getRecipientApi.data && (
                <TableComponent
                    headingFields={[
                        "id",
                        "email",
                        "application_name",
                        "created_at",
                    ]}
                    dataFields={getRecipientApi.data["recipients"]}
                />
            )}
            <button className={`btn btn-dark mx-2 my-2 ${currentPage == 1 ? "disabled":""}`} onClick={handlePrevClick}>
                prev
            </button>
            <button className={`btn btn-dark mx-2 my-2 ${currentPage == totalPages ? "disabled":""}`} onClick={handleNextClick}>
                next
            </button>
        </>
    );
}

export default RecipientContainer;
