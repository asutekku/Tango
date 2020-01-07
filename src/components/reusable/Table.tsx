import * as React from 'react';
import {TableHeader} from '../deckEditor/tableHeader';
import {DBSubject, DBWord} from '../../api/definitions';
import TableCell from './TableCell';

const Table = (props: { headers: DBSubject[], data: DBWord[] }) => {
    return <table>
        <thead>
        <tr>
            {
                props.headers.map((header: DBSubject, i: number) => <TableHeader key={'header-' + i} subject={header}/>)
            }
        </tr>
        </thead>
        <tbody>
        {props.data.map((word: DBWord, i: number) =>
            <tr key={'row-' + i}>
                {Object.keys(word).map((key: string, j: number) => {
                    return key !== 'id' ? <TableCell content={word[key]} key={'cell-' + i + '-' + j}/> : null;
                })}
            </tr>)}
        </tbody>
    </table>;
};

export default Table;