import { useState } from "react";
import "./style.css";
import login from "assets/login.webp";
import "react-toastify/dist/ReactToastify.css";
import { LoginProps } from "components/LoginForm/types";

const LoginUser = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container mt-5">
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
                  onChange={(event) => setEmail(event.target.value)}
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
                  onChange={(event) => setPassword(event.target.value)}
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
                  className="btn"
                  onClick={() => props.onClickFunction(email, password)}
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

export default LoginUser;
