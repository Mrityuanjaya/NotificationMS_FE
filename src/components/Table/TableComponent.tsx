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
                    {props.deleteFunction != undefined && <th>Delete</th>}
                    {props.editFunction  != undefined && <th>Edit</th>}
                    {props.viewFunction != undefined && <th>View</th>}
                </tr>
            </thead>
            <tbody>
                {props.dataFields.map((data, index) => (
                    <TableRowComponent
                        key={index}
                        headingFields={props.headingFields}
                        data={data}
                        deleteFunction={props.deleteFunction}
                        editFunction={props.editFunction}
                        viewFunction={props.viewFunction}
                        deleteFunctionArgs={props.deleteFunctionArgs}
                        editFunctionArgs={props.editFunctionArgs}
                        viewFunctionArgs={props.viewFunctionArgs}
                    />
                ))}
            </tbody>
        </table>
    );
}
export default TableComponent;
