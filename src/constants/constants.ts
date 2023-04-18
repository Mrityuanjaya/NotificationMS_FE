import { ToastOptions } from "react-toastify"

export const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

export const TOAST_CONFIG: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    theme: "colored",
}

export const ERROR_MESSAGES = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email is invalid',
    PASSWORD_REQUIRED: 'Password is required',
    NETWORK_ERROR: 'Network Error',
}
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESSFUL: 'Login Successful'
}

export const SYSTEM_ADMIN_ROLE = 1;
export const ADMIN_ROLE = 2;
