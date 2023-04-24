type TableRowProps = {
    item : { [key: string]: string }
}
function TableRow(props: TableRowProps) {
    return (
        <tr>
            <th scope="row">{Object.values(props.item)[0]}</th>
            {Object.values(props.item)
                .slice(1)
                .map((value) => (
                    <td>{value}</td>
                ))}
        </tr>
    );
}

export default TableRow;
