import * as React from 'react';
import CollectionComponent from './CollectionComponent';
import {Collection} from '../../def/Collection';

export const CollectionListing = ({books: collections}) => (
    <ul>
        {collections ? collections.map((collection: Collection) => <CollectionComponent
            key={collection.owner_id + '-' + collection.id} collection={collection}/>) : null}
    </ul>
);