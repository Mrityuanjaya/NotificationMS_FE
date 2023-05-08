import { TOAST_CONFIG } from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import inviteApi from "services/admins";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoadingStatus, setLoginStatus, setSystemAdminStatus } from "store/slices/userSlice";

const VerificationContainer = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("invitation_code");
    const dispatch = useAppDispatch();
    const postVerifyApi = useApi(inviteApi.verifyCode);
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);

    useEffect(() => {
        postVerifyApi.request(token);
    }, []);
    useEffect(() => {
        if (!postVerifyApi.loading) {
            if (postVerifyApi.data !== null) {
                localStorage.clear();
                dispatch(setLoginStatus(false))
                dispatch(setSystemAdminStatus(false))
                dispatch(setLoadingStatus(false))
                navigate(ROUTES.LOGIN_ROUTE)
                toast.success(`${postVerifyApi.data}`, TOAST_CONFIG);
            } else if (postVerifyApi.error !== "") {
                toast.error(`${postVerifyApi.error}`, TOAST_CONFIG);
            }
        }
    }, [postVerifyApi.loading]);
    return (
        <>
            {postVerifyApi.data !== null && (
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center row py-5 mt-4 align-items-center">
                        <div className="col-md-15 pr-lg-5 mb-5 mb-md-0">
                            <div className="d-flex justify-content-center">
                                <h1 className="m-5">Congratulations!!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerificationContainer;
