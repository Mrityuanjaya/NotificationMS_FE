import { RecipientComponent, TableComponent } from "components";
import {
    ERROR_MESSAGES,
    RECIPIENTS_PER_PAGE,
    SUCCESS_MESSAGES,
    TOAST_CONFIG,
} from "constants/constants";
import routes from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const [data, setData] = useState<{ [key: string]: any }>({});
    const [searchParams] = useSearchParams();
    const [file, setFile] = useState<File>();
    const [currentPage, setCurrentPage] = useState(
        searchParams.get("page_no") == null
            ? 1
            : Number(searchParams.get("page_no"))
    );
    const [totalPages, setTotalPages] = useState(1);
    const postRecipientApi = useApi(useRecipientApi.postRecipients);
    const getRecipientApi = useApi(useRecipientApi.getRecipients);
    const uploadRecipients = () => {
        if (file !== undefined)
            postRecipientApi.request(file, localStorage.getItem("token"));
        else toast.error(ERROR_MESSAGES.NO_FILE_SELECTED, TOAST_CONFIG);
    };

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    useEffect(() => {
        getRecipientApi.request(
            localStorage.getItem("token"),
            currentPage,
            RECIPIENTS_PER_PAGE
        );
    }, [currentPage]);

    useEffect(() => {
        if (!getRecipientApi.loading) {
            if (getRecipientApi.data !== null && getRecipientApi.data.recipients) {
                for(let recipient of getRecipientApi.data.recipients){
                    const date = (new Date(recipient["created_at"])).toLocaleDateString()
                    const time = (new Date(recipient["created_at"])).toLocaleTimeString()
                    recipient["created_at"] = date + " "+  time
                }
                setData(getRecipientApi.data);
                navigate(`${routes.RECIPIENTS_ROUTE}?page_no=${currentPage}`);
                setTotalPages(
                    Math.ceil(
                        getRecipientApi.data.total_recipients /
                            RECIPIENTS_PER_PAGE
                    )
                );
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
            if (postRecipientApi.data !== null) {
                toast.success(
                    SUCCESS_MESSAGES.RECIPIENTS_UPLOAD_SUCCESSFUL,
                    TOAST_CONFIG
                );
            } else if (postRecipientApi.error !== "")
                toast.error(postRecipientApi.error, TOAST_CONFIG);
        }
    }, [postRecipientApi.loading]);

    const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        } else setFile(undefined);
    };
    if (loadingStatus == false && loginStatus == false)
        navigate(routes.LOGIN_ROUTE);
    return (
        <>
            <div className="mb-3 d-flex justify-content-center">
                {systemAdminStatus && (
                    <RecipientComponent
                        handleUploadChange={handleUploadChange}
                        uploadRecipients={uploadRecipients}
                    />
                )}
            </div>
            {data && data.recipients && (
                <TableComponent
                    headingFields={[
                        "id",
                        "email",
                        "application_name",
                        "created_at",
                    ]}
                    dataFields={data.recipients}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    nextFunction={handleNextClick}
                    prevFunction={handlePrevClick}
                ></TableComponent>
            )}
        </>
    );
}

export default RecipientContainer;
