import { SUCCESS_MESSAGES, TOAST_CONFIG } from "constants/constants";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import inviteApi from "services/admins";

const VerificationContainer = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("invitation_code");
    const postVerifyApi = useApi(inviteApi.verifyCode);

    useEffect(() => {
        postVerifyApi.request(token);
    }, []);
    useEffect(() => {
        if (postVerifyApi.data !== null) {
            {
                toast.success(`${postVerifyApi.data}`, TOAST_CONFIG);
            }
        } else if (postVerifyApi.error !== "") {
            toast.error(`${postVerifyApi.error}`, TOAST_CONFIG);
        }
    }, [postVerifyApi.loading]);

    return (
        <>
            {postVerifyApi.error !== null && <h1> {postVerifyApi.error}</h1>}
            {postVerifyApi.data !== null && <h1> Congrats</h1>}
        </>
    );
};

export default VerificationContainer;
