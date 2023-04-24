import React from "react";

import DeleteButton from "components/Buttons/DeleteButtonComponent";
import EditButton from "components/Buttons/EditButtonComponent";

import { TableRowProps } from "./types";

function TableRow(props: TableRowProps) {
    const { headingFields, data, deleteInvitation, handleEdit } = props;
    return (
        <tr>
            {headingFields.map((field, index) => (
                <td key={index}>{(data as any)[field]}</td>
            ))}
            <td>
                {deleteInvitation !== undefined && (
                    <DeleteButton
                        user_id={data.user_id}
                        application_id={data.application_id}
                        handleDelete={deleteInvitation}
                    />
                )}
            </td>
            <td>
                {handleEdit !== undefined && (
                    <EditButton
                        user_id={data.user_id}
                        handleEdit={handleEdit}
                    />
                )}
            </td>
        </tr>
    );
}
export default TableRow;
