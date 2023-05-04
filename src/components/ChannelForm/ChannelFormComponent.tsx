import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "styles/styles.css";

import Dropdown from "components/Dropdown/DropdownComponent";

import { ChannelProps } from "./types";

const ChannelFormComponent = (props: ChannelProps) => {
    const [applicationId, setApplicationId] = useState<number>(
        props.applicationId ? props.applicationId : 1
    );
    const [applicationName, setApplicationName] = useState(
        props.data ? props.data.application_name : ""
    );
    const [name, setName] = useState(props.data ? props.data.name : "");

    const [alias, setAlias] = useState(props.data ? props.data.alias : "");
    const [description, setDescription] = useState(
        props.data ? props.data.description : ""
    );
    const [MAIL_USERNAME, setUsername] = useState(
        props.data ? props.data.configuration.MAIL_USERNAME : ""
    );
    const [MAIL_PASSWORD, setPassword] = useState(
        props.data ? props.data.configuration.MAIL_PASSWORD : ""
    );
    const [MAIL_FROM, setMailFrom] = useState(
        props.data ? props.data.configuration.MAIL_FROM : ""
    );
    const [MAIL_PORT, setMailPort] = useState(
        props.data ? props.data.configuration.MAIL_PORT : 587
    );
    const [USE_CREDENTIALS, setUseCredentials] = useState(
        props.data ? props.data.configuration.USE_CREDENTIALS : 1
    );
    const [MAIL_SERVER, setMAILSERVER] = useState(
        props.data ? props.data.configuration.MAIL_SERVER : ""
    );
    const [MAIL_STARTTLS, setStartTls] = useState(
        props.data ? props.data.configuration.MAIL_STARTTLS : 1
    );
    const [MAIL_SSL_TLS, setSSLTLS] = useState(
        props.data ? props.data.configuration.MAIL_SSL_TLS : 1
    );

    const handleSubmit = () => {
        props.onClickFunction(
            applicationId,
            name,
            alias,
            description,
            MAIL_USERNAME,
            MAIL_PASSWORD,
            MAIL_FROM,
            MAIL_PORT,
            MAIL_SERVER,
            USE_CREDENTIALS,
            MAIL_STARTTLS,
            MAIL_SSL_TLS
        );
    };
    return (
        <div className="container mt-5">
            <div className="row py-5 mt-4 justify-content-center">
                <div className="col-md-7 col-lg-6 ml-auto">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="row dashboard-input">
                            <div className="label-input">Application</div>
                            {props.applications && (
                                <div className="input-group col-lg-12 mb-4">
                                    <Dropdown
                                        initialValue={applicationId}
                                        options={props.applications}
                                        onSelect={(value: number) => {
                                            setApplicationId(value);
                                        }}
                                    />
                                </div>
                            )}
                            {props.data && (
                                <div className="input-group col-lg-12 mb-4">
                                    <input
                                        value={applicationName}
                                        onChange={(event) => {
                                            setApplicationName(
                                                event.target.value
                                            );
                                        }}
                                        id="applicationName"
                                        type="name"
                                        name="applicationName"
                                        placeholder="Name"
                                        className="form-control bg-white border-left-style: none border-md p-3"
                                        disabled
                                        required
                                    />
                                </div>
                            )}
                            <div className="label-input">Name</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                    id="name"
                                    type="name"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">Alias</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={alias}
                                    onChange={(event) => {
                                        setAlias(event.target.value);
                                    }}
                                    id="alias"
                                    type="name"
                                    name="alias"
                                    placeholder="ALIAS"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    disabled={props.data != undefined}
                                    required
                                />
                            </div>
                            <div className="label-input">Description</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                    id="description"
                                    type="name"
                                    name="description"
                                    placeholder="DESCRIPTION"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">MAIL_USERNAME</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={MAIL_USERNAME}
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                    id="MAIL_USERNAME"
                                    type="name"
                                    name="MAIL_USERNAME"
                                    placeholder="MAIL_USERNAME"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">MAIL_PASSWORD</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={MAIL_PASSWORD}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    id="MAIL_PASSWORD"
                                    type="name"
                                    name="MAIL_PASSWORD"
                                    placeholder="MAIL_PASSWORD"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">MAIL_FROM</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={MAIL_FROM}
                                    onChange={(event) => {
                                        setMailFrom(event.target.value);
                                    }}
                                    id="MAIL_FROM"
                                    type="name"
                                    name="MAIL_FROM"
                                    placeholder="MAIL_FROM"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">MAIL_PORT</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    onChange={(event) => {
                                        setMailPort(Number(event.target.value));
                                    }}
                                    value={MAIL_PORT}
                                    id="MAIL_PORT"
                                    type="number"
                                    name="MAIL_PORT"
                                    placeholder="MAIL_PORT"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">MAIL_SERVER</div>
                            <div className="input-group col-lg-12 mb-4">
                                <input
                                    value={MAIL_SERVER}
                                    onChange={(event) => {
                                        setMAILSERVER(event.target.value);
                                    }}
                                    id="MAIL_SERVER"
                                    type="name"
                                    name="MAIL_SERVER"
                                    placeholder="MAIL_SERVER"
                                    className="form-control bg-white border-left-style: none border-md p-3"
                                    required
                                />
                            </div>
                            <div className="label-input">USE_CREDENTIALS</div>
                            <div className="input-group col-lg-12 mb-4">
                                <select
                                    className="form-select"
                                    value={USE_CREDENTIALS}
                                    onChange={(event) =>
                                        setUseCredentials(
                                            Number(event.target.value)
                                        )
                                    }
                                >
                                    <option value="1">True</option>
                                    <option value="0">False</option>
                                </select>
                            </div>
                            <div className="label-input">MAIL_STARTTLS</div>
                            <div className="input-group col-lg-12 mb-4">
                                <select
                                    className="form-select"
                                    value={MAIL_STARTTLS}
                                    onChange={(event) =>
                                        setStartTls(Number(event.target.value))
                                    }
                                >
                                    <option value="1">True</option>
                                    <option value="0">False</option>
                                </select>
                            </div>
                            <div className="label-input">MAIL_SSL_TLS</div>
                            <div className="input-group col-lg-12 mb-4">
                                <select
                                    className="form-select"
                                    value={MAIL_SSL_TLS}
                                    onChange={(event) =>
                                        setSSLTLS(Number(event.target.value))
                                    }
                                >
                                    <option value="1">True</option>
                                    <option value="0">False</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="button" type="submit">
                                    {props.buttonLabel}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChannelFormComponent;
