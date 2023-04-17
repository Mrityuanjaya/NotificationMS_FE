import { useState, useEffect } from "react";
import { ERROR_MESSAGES, TOAST_CONFIG, EMAIL_REGEX } from "constants/constants";
import "containers/LoginForm/style.css";
import login from "assets/login.webp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "hooks/useApi";
import loginApi from "services/auth";
const LoginForm = () => {
    const postLoginApi = useApi(loginApi.loginUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleClick() {
        if (email.length === 0)
            toast.error(ERROR_MESSAGES.EMAIL_REQUIRED, TOAST_CONFIG);
        else if (password.length === 0)
            toast.error(ERROR_MESSAGES.PASSWORD_REQUIRED, TOAST_CONFIG);
        else if (!EMAIL_REGEX.test(email))
            toast.error(ERROR_MESSAGES.EMAIL_INVALID, TOAST_CONFIG);
        else {
            await postLoginApi.request(email, password);
        }
    }
    useEffect(() => {
        if (postLoginApi.data != null) {
            localStorage.setItem("token", postLoginApi.data["access_token"]);
        }
    }, [postLoginApi.data]);

    return (
        <div className="container">
            <div className="row py-5 mt-4 align-items-center">
                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                    <img
                        src={login}
                        alt="Login Image"
                        className="img-fluid mb-3 d-none d-md-block"
                    />
                </div>
                <div className="col-md-7 col-lg-6 ml-auto">
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="row">
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control bg-white border-left-style: none border-md"
                                    required
                                />
                            </div>
                            <div className="input-group col-lg-6 mb-4">
                                <input
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control bg-white border-left-style: none border-md"
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn button"
                                    onClick={handleClick}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
