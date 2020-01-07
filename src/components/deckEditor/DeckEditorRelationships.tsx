import * as React from 'react';
import DeckEditorRelation from './DeckEditorRelation';
import {Deck} from '../../def/Deck';
import {DBSubject} from '../../api/definitions';

const DeckEditorRelationships = (props: { options: DBSubject[], deck: Deck, updateRelationships: any }) => {


    return (
        <div>
            <h2>Relationship editor</h2>
            <p>Relationship between columns determines the learning order. For an example, English - Japanese means that
                english
                word will be displayed and japanese word need to written down.</p>
            <p>You can omit some columns. They will still be saved but won't appear when you're studying the deck.</p>
            <DeckEditorRelation options={props.options} deck={props.deck}/>
        </div>
    );
};

export default DeckEditorRelationships;