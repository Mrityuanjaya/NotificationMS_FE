import { TableProps } from "components/Table/types";
import TableRowComponent from "components/Table/TableRowComponent";

function TableComponent(props: TableProps) {
    return (
        <div>
            <table className="table">
                <caption>List of {props.name}</caption>
                <thead>
                    <tr>
                        {Object.keys(props.items[0]).map((item) => (
                            <th scope="col">{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item) => (
                        <TableRowComponent key={item.id} item={item}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
