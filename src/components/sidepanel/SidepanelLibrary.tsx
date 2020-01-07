import * as React from 'react';
import {Component} from 'react';
import {CollectionListing} from './CollectionListing';
import {DBCollection} from '../../api/definitions';
import {http} from '../../api/calls';
import {Collection} from '../../def/Collection';
import {Deck} from '../../def/Deck';

interface CollectionProps {
    userID: number
}

interface CollectionState {
    collections: DBCollection[];
}

class SidepanelLibrary extends Component<CollectionProps, CollectionState> {

    constructor(props: CollectionProps) {
        super(props);
        this.state = {collections: []};
    }

    async componentDidMount() {
        const collections: any[] = await http<Collection[]>(
            `http://localhost:3000/collections/find/${this.props.userID}`
        );
        for await (const collection of collections) {
            collection.decks = await http<Deck[]>(
                `http://localhost:3000/decks/find/${this.props.userID}/${collection.id}`
            ).catch(err => {
                console.log(err);
            });
        }
        this.setState({collections: collections});
    }

    render() {
        return <CollectionListing books={this.state.collections}/>;
    }
}

export default SidepanelLibrary;