import * as React from 'react';
import {Link} from 'react-router-dom';
import {Deck} from '../../def/Deck';

function DeckComponent(props: { deck: Deck }) {
    return <Link to={`/deck-viewer/${props.deck.owner_id}/${props.deck.collection_id}/${props.deck.id}`}>
        <li className={'sidebar-category-chapter'}>{props.deck.name}</li>
    </Link>;
}

export default DeckComponent;