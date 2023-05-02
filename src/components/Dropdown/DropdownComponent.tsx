import React, { useState } from "react";

import { DropdownProps } from "components/Dropdown/types";

function Dropdown(props: DropdownProps) {
    const { initialValue, options, onSelect } = props;
    const keys = Object.keys(options);
    const [value, setValue] = useState(initialValue);

    const handleOptionSelect = (value: any) => {
        setValue(value);
        onSelect(value);
    };
    return (
        <select
            className="input-group col-lg-6 mb-4 bg-white border-md p-3"
            value={value}
            onChange={(event) => {
                handleOptionSelect(event.target.value);
            }}
        >
            {keys.map((key) => (
                <option key={key} value={key}>
                    {options[Number(key)]}
                </option>
            ))}
        </select>
    );
}
export default Dropdown;
