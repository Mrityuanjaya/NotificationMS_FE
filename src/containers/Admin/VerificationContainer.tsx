import invite_failure_img from "assets/failure.png";
import invite_success_img from "assets/success.jpeg";
import { TOAST_CONFIG } from "constants/constants";
import ROUTES from "constants/routes";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import inviteApi from "services/admins";
import { useAppSelector } from "store/hooks";

const VerificationContainer = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("invitation_code");
  const postVerifyApi = useApi(inviteApi.verifyCode);
  const navigate = useNavigate();
  const loginStatus = useAppSelector((state) => state.user.loginStatus);

  const handleClick = () => {
    navigate(ROUTES.LOGIN_ROUTE);
  };
  useEffect(() => {
    postVerifyApi.request(token);
  }, []);
  useEffect(() => {
    if (!postVerifyApi.loading) {
      if (postVerifyApi.data !== null) {
        {
          toast.success(`${postVerifyApi.data}`, TOAST_CONFIG);
        }
      } else if (postVerifyApi.error !== "") {
        toast.error(`${postVerifyApi.error}`, TOAST_CONFIG);
      }
    }
  }, [postVerifyApi.loading]);

  return (
    <>
      {postVerifyApi.error !== null && (
        <div className="d-flex justify-content-center">
          <div className="row py-5 mt-4 align-items-center">
            <div className="col-md-12 pr-lg-5 mb-5 mb-md-0">
              <img
                src={invite_failure_img}
                alt="Invite Failed"
                className="img-fluid mb-3 d-none d-md-block"
                style={{ height: 370 }}
              />
              <div className="d-flex justify-content-center">
                <h1>{`${postVerifyApi.error}`}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {postVerifyApi.data == null && (
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center row py-5 mt-4 align-items-center">
            <div className="col-md-15 pr-lg-5 mb-5 mb-md-0">
              <img
                src={invite_success_img}
                alt="Invite Successful"
                className="img-fluid mb-3 d-none d-md-block"
                style={{ height: 370 }}
              />
              <div className="d-flex justify-content-center">
                <h1 className="m-5">Congratulations</h1>
              </div>
              <div className="d-flex justify-content-center">
                {!loginStatus && (
                  <button className="button" onClick={handleClick}>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationContainer;
