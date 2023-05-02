import { DeleteButton, EditButton, ViewButton } from "components";

import { TableRowProps } from "components/Table/types";

function TableRow(props: TableRowProps) {
    const { headingFields, data, deleteFunction, editFunction, viewFunction, deleteFunctionArgs, editFunctionArgs, viewFunctionArgs } = props;
    return (
        <tr>
            {headingFields.map((field, index) => (
                <td key={index}>{(data as any)[field]}</td>
            ))}
            {deleteFunction !== undefined && deleteFunctionArgs !== undefined && (
                <td>
                    <DeleteButton
                        args={deleteFunctionArgs?.map((arg)=>data[arg])}
                        handleClick={deleteFunction}
                        disabled={data.is_active == "False"}
                    />
                </td>
            )}
            {editFunction !== undefined && editFunctionArgs !== undefined && (
                <td>
                    <EditButton
                        args={editFunctionArgs?.map((arg)=>data[arg])}
                        handleClick={editFunction}
                        disabled={data.is_active == "False"}
                    />
                </td>
            )}
            {viewFunction !== undefined && viewFunctionArgs !== undefined && (
                <td>
                    <ViewButton
                        args={viewFunctionArgs?.map((arg)=>data[arg])}
                        handleClick={viewFunction}
                        disabled={data.is_active == "False"}
                    />
                </td>
            )}
        </tr>
    );
}
export default TableRow;
