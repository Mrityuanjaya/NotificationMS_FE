import invite_img from "assets/Invite.svg";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "styles/styles.css";

import { InviteProps } from "components/InviteForm/types";

const InviteFormComponent = (props: InviteProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [applicationId, setApplicationId] = useState("");

  return (
    <div className="container mt-5">
      <div className="row py-5 mt-4 align-items-center">
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img
            src={invite_img}
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
                  onChange={(event) => setName(event.target.value)}
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
                  onChange={(event) => setEmail(event.target.value)}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control bg-white border-left-style: none border-md p-3"
                  required
                />
              </div>
              <div className="input-group col-lg-6 mb-4">
                <input
                  value={applicationId}
                  onChange={(event) => setApplicationId(event.target.value)}
                  id="applicationId"
                  type="applicationId"
                  name="applicationId"
                  placeholder="Application Id"
                  className="form-control bg-white border-left-style: none border-md p-3"
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="button"
                  onClick={() =>
                    props.onClickFunction(name, email, applicationId)
                  }
                >
                  Invite
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteFormComponent;
