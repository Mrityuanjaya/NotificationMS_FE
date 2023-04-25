import EditImage from "assets/EditPage.webp";
import ROUTES from "constants/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "store/hooks";
import "styles/styles.css";

import { EditAdminProps } from "components/EditAdmin/types";

const EditAdminComponent = (props: EditAdminProps) => {
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const navigate = useNavigate();

    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [role, setRole] = useState(props.user.role);

    if (!loginStatus) navigate(ROUTES.LOGIN_ROUTE);
    return (
        <div className="container mt-5">
            <div className="row py-5 mt-4 align-items-center">
                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                    <img
                        src={EditImage}
                        alt="Login Image"
                        className="img-fluid mb-3 d-none d-md-block"
                    />
                </div>
                <div className="col-md-7 col-lg-6 ml-auto">
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="row">
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    id="name"
                                    type="name"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
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
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(event) =>
                                        setRole(Number(event.target.value))
                                    }
                                >
                                    <option value="1">System Admin</option>
                                    <option value="2">Admin</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    className="button"
                                    onClick={() =>
                                        props.onClickFunction(name, email, role)
                                    }
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAdminComponent;
