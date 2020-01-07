import * as React from 'react';
import {StudyItem} from '../../def/studyItem';
import TableCellEditable from './tableCellEditable';
import {UIItem} from '../../def/IUIitem';
import {Deck} from '../../def/Deck';
import {DBSubject} from '../../api/definitions';

interface RowState {
    word: StudyItem;
}

interface RowProps {
    studySubjects: DBSubject[];
    deckID: number;
    row: number;
    keyDownOnCell: any;
    handleFocus: any;
    focus: boolean;
    references: any;
    deck: Deck;
    value: any;
    onChange: any;
}

class TableRow extends React.Component<RowProps, RowState> {
    constructor(props: any) {
        super(props);
        this.state = {
            word: new StudyItem(this.props.deckID)
        };
        //this.props.deck.studyItems.push(this.state.word);
    }

    onChange = (e: any) => {
        this.state.word.updateTypeByID(e.target.id.split('_')[1], e.target.value);
    };

    render() {
        return (
            <tr>
                {this.props.studySubjects.map((subject: UIItem, i: number) => {
                    let ref: any = React.createRef();
                    this.props.references(ref);
                    let value = this.props.value[subject.id];
                    //this.updateWord(this.props.studySubjects);
                    //this.addType(subject);
                    return <TableCellEditable subject={subject}
                                              row={this.props.row}
                                              column={i}
                                              reference={ref}
                                              handleKeyDown={this.props.keyDownOnCell}
                                              onFocus={this.props.handleFocus}
                                              autoFocus={this.props.focus && i === 0}
                                              onChange={this.props.onChange}
                                              key={'cell_' + this.props.row + '-' + i}
                                              value={value}/>;
                })}
                <td/>
            </tr>
        );
    }
}

export default TableRow;