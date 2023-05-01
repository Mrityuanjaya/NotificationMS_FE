import { TableRowComponent } from "components";

import { TableProps } from "components/Table/types";

function TableComponent(props: TableProps) {
    return (
        <table className="table table-striped table-bordered vertical-align: middle text-center">
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
                    <TableRowComponent
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
export default TableComponent;
