import { ERROR_MESSAGES, TOAST_CONFIG, EMAIL_REGEX } from "constants/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginFormComponent from "components/LoginForm/LoginFormComponent";

const LoginFormContainer = () => {
  async function handleClick(email: string, password: string) {
    if (email.length === 0)
      toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
    else if (password.length === 0)
      toast.error(ERROR_MESSAGES.PASSWORD_REQUIRED, TOAST_CONFIG);
    else if (!EMAIL_REGEX.test(email))
      toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
  }
  return <LoginFormComponent onClickFunction={handleClick} />;
};

export default LoginFormContainer;
