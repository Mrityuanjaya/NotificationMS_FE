import { TOAST_CONFIG } from "constants/constants";
import { useState } from "react";
import { toast } from "react-toastify";
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
    const [configuration, setConfiguration] = useState(
        props.data ? JSON.stringify(props.data.configuration) : "{}"
    );
    const handleSubmit = () => {
        try {
            JSON.parse(configuration);
        } catch (error) {
            toast.error("Invalid Json Input", TOAST_CONFIG);
        }
        props.onClickFunction(
            applicationId,
            name,
            alias,
            description,
            JSON.parse(configuration)
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
                                        className="form-control disabled-input border-md p-3"
                                        readOnly
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
                                    className={
                                        props.viewMode
                                            ? "form-control disabled-input border-md p-3"
                                            : "form-control border-md p-3"
                                    }
                                    disabled={props.viewMode}
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
                                    className={
                                        props.data
                                            ? "form-control disabled-input border-md p-3 "
                                            : "form-control border-md p-3"
                                    }
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
                                    className={
                                        props.viewMode
                                            ? "form-control disabled-input border-md p-3"
                                            : "form-control border-md p-3"
                                    }
                                    disabled={props.viewMode}
                                    required
                                />
                            </div>
                            <div className="label-input">Configuration</div>
                            <div className="input-group col-lg-12 mb-4">
                                <textarea
                                    value={configuration}
                                    onChange={(event) => {
                                        setConfiguration(event.target.value);
                                    }}
                                    rows={10}
                                    id="configuration"
                                    name="description"
                                    placeholder="Enter Email Configuration in JSON Format"
                                    className={
                                        props.viewMode
                                            ? "form-control disabled-input border-md p-3"
                                            : "form-control border-md p-3"
                                    }
                                    disabled={props.viewMode}
                                    required
                                />
                            </div>
                            {props.isButtonVisible && <div className="d-flex justify-content-center">
                                <button
                                    className="button"
                                    onClick={() => handleSubmit}
                                >
                                    {props.buttonLabel}
                                </button>
                            </div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChannelFormComponent;
