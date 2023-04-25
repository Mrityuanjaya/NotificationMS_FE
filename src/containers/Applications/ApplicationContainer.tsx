import { ApplicationComponent } from "components";
import {
  ERROR_MESSAGES,
  MAX_NAME_LENGTH,
  SUCCESS_MESSAGES,
  TOAST_CONFIG,
} from "constants/constants";
import useApi from "hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import applicationApi from "services/application";

const ApplicationContainer = () => {
  const postAplicationApi = useApi(applicationApi.postApplications);

  async function handleClick(name: string) {
    if (name.length === 0)
      toast.error(ERROR_MESSAGES.NAME_REQUIRED, TOAST_CONFIG);
    else if (name.length > MAX_NAME_LENGTH)
      toast.error(ERROR_MESSAGES.NAME_INVALID, TOAST_CONFIG);
    else await postAplicationApi.request(name, localStorage.getItem("token"));
  }

  useEffect(() => {
    if (!postAplicationApi.loading) {
      if (postAplicationApi.data !== null) {
        toast.success(
          SUCCESS_MESSAGES.CREATE_APPLICATION_SUCCESSFUL,
          TOAST_CONFIG
        );
      } else if (postAplicationApi.error !== "") {
        toast.error(`${postAplicationApi.error}`, TOAST_CONFIG);
      }
    }
  }, [postAplicationApi.loading]);

  return <ApplicationComponent onClickFunction={handleClick} />;
};

export default ApplicationContainer;
