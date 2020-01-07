import * as React from 'react';
import {DBSubject} from '../../api/definitions';

export const TableHeader = (props: { subject: DBSubject }) => {
    return (
        <th className={'table-header'} id={props.subject.id.toString()}>{props.subject.name.toString()}</th>
    );
};

interface HeaderSelectState {
    value: string;
}

interface HeaderSelectProps {
    options: DBSubject[],
    newColumn: any;
}

export class TableHeaderSelect extends React.Component<HeaderSelectProps, HeaderSelectState> {

    constructor(props) {
        super(props);
        this.state = {value: 'empty'};
    }

    /**
     * Get's the ID
     * @param e
     */
    handleChange(e: any) {
        const index = e.target.selectedIndex;
        const subject_ID = e.target.childNodes[index].id;
        let found = this.props.options.find((el: DBSubject) => el.id === parseInt(subject_ID));
        this.props.newColumn(found);
    }

    render() {
        return <th className={'table-header'}>
            <select onChange={(e) => this.handleChange(e)} value={this.state.value}>
                <option disabled={true} hidden value="empty">Add new column</option>
                {
                    this.props.options.map((o: DBSubject, i: number) => {
                        return <option value={o.id} id={o.id.toString()} key={i}>{o.name.toString()}</option>;
                    })
                }
            </select>
        </th>;
    }
}