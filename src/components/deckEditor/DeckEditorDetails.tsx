import * as React from 'react';
import LabeledInput from '../reusable/LabeledInput';
import LabeledSelect from '../reusable/LabeledSelect';
import {Collection} from '../../def/Collection';
import {Deck} from '../../def/Deck';

const DeckEditorDetails = (props: { collections: Collection[], deck: Deck, changeName: any, changeDescription: any, changeCollection: any }) => {

    return <>
        <div>
            <h2>Details</h2>
            <p>Please fill in the details of the deck.</p>
            <LabeledInput label={'Deck Name'} value={props.deck.name} required={true} onChange={props.changeName}/>
            <LabeledInput label={'Deck Description'} value={props.deck.description} required={false}
                          onChange={props.changeDescription}/>
            <LabeledSelect label={'Deck Collection'}
                           options={props.collections}
                           handleChange={props.changeCollection}
                           emptyDefault={true}
                           canBeEmpty={false}
                           default={props.collections ? props.collections.find(c => c.id === props.deck.collection_id).id : undefined}
                           name={'collection'}/>
        </div>
    </>;
};

export default DeckEditorDetails;