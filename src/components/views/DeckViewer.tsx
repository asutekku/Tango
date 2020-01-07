import * as React from 'react';
import {Collection} from '../../def/Collection';
import Table from '../reusable/Table';
import {Helmet} from 'react-helmet';
import {http} from '../../api/calls';
import {DBSubject, DBWord} from '../../api/definitions';
import LinkButton from '../reusable/LinkButton';
import {deckGET} from '../../def/deckGET';

interface DeckViewerState {
    deck: deckGET;
    collections: Collection;
    words: DBWord[];
    subjects: DBSubject[];
    deckPath: string;
}

interface DeckViewerProps {
    match?: any;
}

class DeckViewer extends React.Component<DeckViewerProps, DeckViewerState> {
    constructor(props) {
        super(props);
        this.state = {
            deck: undefined,
            collections: undefined,
            words: [],
            subjects: [],
            deckPath: ''
        };
    }

    async componentDidMount() {
        let user_ID = parseInt(this.props.match.params.user);
        let collection_ID = parseInt(this.props.match.params.collections);
        let deck_ID = parseInt(this.props.match.params.deck);
        let deckPath = `${user_ID}/${collection_ID}/${deck_ID}`;
        const collection: Collection = await http<Collection>(
            `http://localhost:3000/collections/find/${user_ID}/${collection_ID}`
        );
        const deck: deckGET = await http<deckGET>(
            `http://localhost:3000/decks/find/${deck_ID}`
        );
        console.log(collection);
        const words = deck.words;
        this.setState({
            collections: collection[0],
            deck: deck,
            words: words,
            subjects: deck.subjects,
            deckPath: deckPath
        });
    }

    render() {
        return <>
            <div id={'deck-viewer'}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Deck Viewer - Tango</title>
                </Helmet>
                <h2>{this.state.collections ? this.state.collections.name : 'Collection not found'}</h2>
                <h1>{this.state.deck ? this.state.deck.name : 'Deck not found'}</h1>
                <h3>Content</h3>
                {this.state.words ? <Table headers={this.state.subjects} data={this.state.words}/> : null}
                <LinkButton title={'Edit Deck'} location={`/deck-editor/${this.state.deckPath}`}/>
                <LinkButton title={'Study Deck'} location={`/study/${this.state.deckPath}`}/>
            </div>
        </>;
    }

}

export default DeckViewer;