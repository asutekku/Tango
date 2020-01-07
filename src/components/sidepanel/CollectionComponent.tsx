import * as React from 'react';
import {Collection} from '../../def/Collection';
import DeckComponent from './DeckComponent';
import {Deck} from '../../def/Deck';

function CollectionComponent(props: { collection: Collection, children?: any }) {
    return <>
        <li className={'sidebar-category-title'} key={`${props.collection.id}t`}>{props.collection.name}</li>
        <ul className={'sidebar-category-children'} key={`${props.collection.id}c`}>
            {props.collection.decks.map((d: Deck) => <DeckComponent deck={d} key={props.collection.id + '_' + d.id}/>)}
        </ul>
    </>;
}

export default CollectionComponent;