import * as React from 'react';
import {TableHeader, TableHeaderSelect} from './tableHeader';
import {Deck} from '../../def/Deck';
import {StudySubject} from '../../def/StudySubject';
import TableRow from './tableRow';
import {DBSubject} from '../../api/definitions';

interface TableState {
    entries: number;
    refs: any[];
    focus: any;

}

interface TableProps {
    headers: DBSubject[];
    updateOptions: any;
    options: DBSubject[];
    deck: Deck;
    words: any[];
    onCellChange: any;
}

class DeckEditorTable extends React.Component<TableProps, TableState> {

    references: any[][] = [];

    constructor(props) {
        super(props);
        this.state = {
            entries: 1,
            refs: [],
            focus: undefined
        };
    }

    createTable = () => {
        let table = [],
            refs: any[] = [];
        for (let i = 0; i < this.props.words.length; i++) {
            let row = [];
            table.push(
                <TableRow
                    studySubjects={this.props.headers}
                    deckID={this.props.deck.id}
                    row={i}
                    keyDownOnCell={this.handleKeyDown}
                    handleFocus={this.handleFocus}
                    focus={i === this.state.entries - 1}
                    references={(ref) => refs[i].push(ref)}
                    key={i + 'tableRow'}
                    deck={this.props.deck}
                    value={this.props.words[i]}
                    onChange={this.props.onCellChange}/>
            );
            refs[i] = row;
        }
        this.references = refs;
        return table;
    };

    componentDidMount(): void {
        this.setState({refs: this.references});
    }

    /**
     * Creates a new row on enter on last cell
     * @param e
     */
    handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            let pos = [parseInt(e.target.id.split('-')[0]), parseInt(e.target.id.split('-')[1])];
            let last = [this.state.entries - 1, this.props.headers.length - 1];
            console.log(pos);
            console.log(last);
            if (pos[0] === last[0] && pos[1] === last[1]) { // If selection is last cell
                console.log('EOL');
                let entries = this.state.entries + 1;
                this.setState({entries: entries});
                // We can't use last focus on here so new row creates an item with autoselect
            } else if (pos[0] !== last[0] && pos[1] === last[1]) { // If selection is last column but not last row
                console.log('If selection is last column but not last row');
                this.references[pos[0] + 1][0].current.focus();
            } else if (pos[0] !== last[0] && pos[1] !== last[1]) { // Not last row nor last item
                console.log('Not last row nor last item');
                this.references[pos[0]][pos[1] + 1].current.focus();
            } else { // Last row but not last item
                this.references[last[0]][pos[1] + 1].current.focus();
                console.log('Why are you here?');
            }
            //console.log(e.target);
        }
    };

    handleFocus = (e: any) => {
        this.setState({focus: e});
    };

    addColumn = (subject: StudySubject) => {
        this.props.updateOptions(subject);
        this.props.deck.addStudySubject(subject);
    };

    render() {
        return (
            <>
                <h2>Content</h2>
                <p>Choose at least two subjects to create the deck from.</p>
                <table>
                    <thead>
                    <tr>
                        {this.props.headers.map((h: DBSubject, i: number) => {
                            return <TableHeader subject={h} key={i}/>;
                        })}
                        <TableHeaderSelect options={this.props.options}
                                           newColumn={this.addColumn}/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.words ? this.createTable() : null
                    }
                    </tbody>
                </table>
            </>
        );
    }
}

export default DeckEditorTable;