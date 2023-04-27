import React from "react";

import { TableProps } from "components/Table/types";

import TableRow from "components/Table/TableRowComponent";

function Table(props: TableProps) {
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.headingFields.map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                    {props.deleteInvitation && <th>Delete</th>}
                    {props.handleEdit && <th>Edit</th>}
                </tr>
            </thead>
            <tbody>
                {props.dataFields.map((data, index) => (
                    <TableRow
                        key={index}
                        headingFields={props.headingFields}
                        data={data}
                        deleteInvitation={props.deleteInvitation}
                        handleEdit={props.handleEdit}
                    />
                ))}
            </tbody>
        </table>
    );
}
export default Table;
