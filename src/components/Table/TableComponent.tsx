import { TableRowComponent } from "components";

import { TableProps } from "components/Table/types";

function TableComponent(props: TableProps) {
    const tableKeys = Object.keys(props.headingFields);
    return (
        <>
            <table className="table table-striped table-bordered vertical-align: middle text-center">
                <thead>
                    <tr>
                        {tableKeys.map((key, index) => (
                            <th key={index}>{props.headingFields[key]}</th>
                        ))}
                        {props.deleteFunction != undefined && <th>Delete</th>}
                        {props.editFunction != undefined && <th>Edit</th>}
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
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button
                            className={`btn btn-dark ${
                                props.currentPage <= 1 ? "disabled" : ""
                            }`}
                            onClick={props.prevFunction}
                        >
                            {"<<"}
                        </button>
                    </li>
                    <li className="page-item">
                        <a className="page-link">{props.currentPage}</a>
                    </li>
                    <li className="page-item">
                        <button
                            className={`btn btn-dark ${
                                props.currentPage >= props.totalPages
                                    ? "disabled"
                                    : ""
                            }`}
                            onClick={props.nextFunction}
                        >
                            {">>"}
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
export default TableComponent;
