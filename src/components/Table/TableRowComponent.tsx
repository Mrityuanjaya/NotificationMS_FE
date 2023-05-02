import { DeleteButton, EditButton } from "components";

import { TableRowProps } from "components/Table/types";

function TableRow(props: TableRowProps) {
    const { headingFields, data, deleteFunction, editFunction, deleteFunctionArgs, editFunctionArgs } = props;
    return (
        <tr>
            {headingFields.map((field, index) => (
                <td key={index}>{(data as any)[field]}</td>
            ))}
            {deleteFunction !== undefined && (
                <td>
                    <DeleteButton
                        args={deleteFunctionArgs?.map((arg)=>data[arg])}
                        handleClick={deleteFunction}
                        disabled={data.is_active == "False"}
                    />
                </td>
            )}
            {editFunction !== undefined && (
                <td>
                    <EditButton
                        args={editFunctionArgs?.map((arg)=>data[arg])}
                        handleClick={editFunction}
                        disabled={data.is_active == "False"}
                    />
                </td>
            )}
        </tr>
    );
}
export default TableRow;
