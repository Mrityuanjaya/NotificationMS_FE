import { ToastOptions } from "react-toastify"

export const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
export const MAX_EMAIL_LENGTH = 360;
export const MAX_NAME_LENGTH = 255;

export const TOAST_CONFIG: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    theme: "colored",
}

export const ERROR_MESSAGES = {
    APPLICATION_ID_REQUIRED: 'Application Id is required.',
    NAME_REQUIRED: 'Name is required.',
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Email is invalid.',
    PASSWORD_REQUIRED: 'Password is required.',
    NETWORK_ERROR: 'Network Error',
    NAME_INVALID: 'Name is too long.',
    NO_FILE_SELECTED: 'No File Selected',
    START_DATE_GREATER_THAN_END_DATE:'Start Date must be less than End Date.' 
}
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESSFUL: 'Login Successful',
    ACCEPT_SUCCESSFUL: 'Invite Accepted Successfully',
    INVITE_SUCCESSFUL: 'Invite Sent Successfully',
    RECIPIENTS_UPLOAD_SUCCESSFUL: 'Recipients uploaded Successfully',
    RECIPIENT_FETCH_SUCCESSFUL: 'Recipients fetched successfully',
    CREATE_APPLICATION_SUCCESSFUL: 'Application Created SuccessFully'
}

export const SYSTEM_ADMIN_ROLE = 1;
export const ADMIN_ROLE = 2;
export const RECIPIENTS_PER_PAGE = 15
