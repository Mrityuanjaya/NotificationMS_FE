import { DeleteButton, EditButton } from "components";

import { TableRowProps } from "components/Table/types";

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
                        args={[data.user_id, data.application_id]}
                        handleClick={deleteInvitation}
                        disabled={data.is_active == "False"}
                    />
                )}
            </td>
            <td>
                {handleEdit !== undefined && (
                    <EditButton
                        args={[data.user_id]}
                        handleClick={handleEdit}
                        disabled={false}
                    />
                )}
            </td>
        </tr>
    );
}
export default TableRow;
