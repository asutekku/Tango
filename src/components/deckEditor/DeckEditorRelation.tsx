import * as React from 'react';
import LabeledSelect from '../reusable/LabeledSelect';
import LabeledInput from '../reusable/LabeledInput';
import {Deck} from '../../def/Deck';
import {Relation} from '../../def/Relation';
import {DBSubject} from '../../api/definitions';
import {http} from '../../api/calls';

interface DeckEditorRelationProps {
    options: DBSubject[],
    deck: Deck
}

interface DeckEditorRelationState {
    relation: Relation;
}

class DeckEditorRelation extends React.Component<DeckEditorRelationProps, DeckEditorRelationState> {

    constructor(props) {
        super(props);
        this.state = {relation: new Relation(this.props.options[0], this.props.options[1])};
    }

    changeQuestion = (e: any) => {
        let subject = this.getSubject(e);
        let relation = this.state.relation;
        //relation.question = subject;
        this.setState({relation: relation});
        this.updateRelation(this.state.relation.id);
    };

    changeAnswer = (e: any) => {
        let subject = this.getSubject(e);
        let relation = this.state.relation;
        //relation.answer = subject;
        this.setState({relation: relation});
        this.updateRelation(this.state.relation.id);
    };

    async getSubject(e: any) {
        const index = e.target.selectedIndex;
        const id = e.target.childNodes[index].value;
        return await http<DBSubject>(` http://localhost:3000/subjects/find/${id.toString()}`);
    };

    /**
     * For some reason it updates the relations on model even they are not updated here?
     * @param id
     */
    updateRelation = (id: number) => {
        let found = !!this.props.deck.relations.find((el: Relation) => el.id === id);
        if (this.props.deck.relations.length <= 0 || !found) {
            this.props.deck.relations.push(this.state.relation);
        } else {
            let relation = this.props.deck.relations.find((el: Relation) => el.id === id);
        }
    };

    changeTip = (e: any) => {
        let relation = this.state.relation;
        relation.tip = e;
        this.setState({relation: relation});
        this.updateRelation(this.state.relation.id);
    };

    render() {
        return (
            <div>
                <h3>Choose relationship</h3>
                <div className={'relationship-container'}>
                    <LabeledSelect name={'question'} label={'Question'} options={this.props.options}
                                   handleChange={this.changeQuestion}/>
                    <LabeledSelect name={'answer'} label={'Answer'} options={this.props.options}
                                   handleChange={this.changeAnswer}/>
                    <LabeledInput label={'Relationship tip'} required={false}
                                  placeHolder={'E.g. Write the word in English'}
                                  onChange={this.changeTip}/>
                </div>
            </div>
        );
    }
}

export default DeckEditorRelation;