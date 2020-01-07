import * as React from 'react';

const TableCell = (props: { content: string }) => {
    return (
        <td className={'table-cell'}>
            {props.content}
        </td>
    );
};

export default TableCell;