import * as React from 'react';
import {UIItem} from '../../def/IUIitem';

interface CellProps {
    subject: UIItem;
    row: number;
    column: number;
    reference: any;
    handleKeyDown: any;
    onFocus: any;
    autoFocus: boolean;
    onChange: any;
    value?: string;
}

const InputField = React.forwardRef((props: any, ref: any) => (
    <input type={'text'}
           ref={ref}
           {...props}/>
));

interface CellState {
    value: string;
}

class TableCellEditable extends React.Component<CellProps, CellState> {

    onFocus = () => {
        this.props.onFocus(this.props.reference);
    };

    render() {
        return (
            <td className={'table-cell-editable'}>
                {this.props.subject.toString() !== 'option' ?
                    <InputField
                        id={'row:'+this.props.row + '&column:' + this.props.column + '&subjectID:' + this.props.subject.id}
                        onKeyDown={this.props.handleKeyDown}
                        onFocus={this.onFocus}
                        name={this.props.subject.toString()}
                        ref={this.props.reference}
                        autoComplete="off"
                        autoFocus={this.props.autoFocus}
                        onChange={this.props.onChange}
                        value={this.props.value ? this.props.value : ''}
                    /> : null}
            </td>
        );
    }
}

export default TableCellEditable;