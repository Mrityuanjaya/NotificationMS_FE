import { TableComponent } from "components";
import { CHANNELS_PER_PAGE } from "constants/constants";
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    TOAST_CONFIG,
} from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import channelsApi from "services/channel";
import { useAppSelector } from "store/hooks";

function ChannelContainer() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const systemAdminStatus = useAppSelector(
        (state) => state.user.systemAdminStatus
    );
    const loadingStatus = useAppSelector((state) => state.user.loadingStatus);
    const getChannelsApi = useApi(channelsApi.getChannels);
    const deleteChannelApi = useApi(channelsApi.deleteChannel);
    const [currentPage, setCurrentPage] = useState(
        searchParams.get("page_no") == null ||
            Number(searchParams.get("page_no")) <= 0
            ? 1
            : Number(searchParams.get("page_no"))
    );
    const [totalPages, setTotalPages] = useState(1);

    if (!loadingStatus && !loginStatus) navigate(ROUTES.LOGIN_ROUTE);

    useEffect(() => {
        getChannelsApi.request(
            localStorage.getItem("token"),
            currentPage,
            CHANNELS_PER_PAGE
        );
    }, [currentPage]);

    useEffect(() => {
        if (!getChannelsApi.loading) {
            if (getChannelsApi.data != null) {
                navigate(`${ROUTES.CHANNELS_ROUTE}?page_no=${currentPage}`);
                setTotalPages(
                    Math.ceil(
                        getChannelsApi.data.total_channels / CHANNELS_PER_PAGE
                    )
                );
            } else if (!getChannelsApi.loading && getChannelsApi.error != "") {
                toast.error(getChannelsApi.error, TOAST_CONFIG);
            }
        }
    }, [getChannelsApi.loading]);

    const handleNextClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };
    const headingFields = {
        alias: "Alias",
        application_name: "Application Name",
        description: "Description",
        type: "Channel Type",
        created_at: "Creation Time",
    };

    const redirectToChannelPage = async (alias: string) => {
        navigate(ROUTES.EDIT_CHANNEL_ROUTE.replace(":alias", alias));
    };

    const deleteChannel = async (alias: string) => {
        deleteChannelApi.request(alias, localStorage.getItem("token"));
    };
    useEffect(() => {
        if (!deleteChannelApi.loading) {
            if (deleteChannelApi.data !== null) {
                toast.success(`${deleteChannelApi.data}`, TOAST_CONFIG);
            } else if (deleteChannelApi.error !== "") {
                toast.error(`${deleteChannelApi.error}`, TOAST_CONFIG);
            }
        }
    }, [deleteChannelApi.loading]);
    return (
        <div>
            <div className="d-flex justify-content-around m-3"> 
                <div>
                    <h1>List of Channels</h1>
                </div>
                {systemAdminStatus && <div className="m-2">
                    <Link className="button" to={ROUTES.CREATE_CHANNEL_ROUTE}>
                        CREATE CHANNEL
                    </Link>
                </div>}
            </div>
            {getChannelsApi.data && (
                <TableComponent
                    headingFields={headingFields}
                    dataFields={getChannelsApi.data.channels}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    nextFunction={handleNextClick}
                    prevFunction={handlePrevClick}
                    viewFunction={redirectToChannelPage}
                    viewFunctionArgs={["alias"]}
                    deleteFunction={systemAdminStatus?deleteChannel:undefined}
                    deleteFunctionArgs={["alias"]}
                />
            )}
        </div>
    );
}

export default ChannelContainer;
