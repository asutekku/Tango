import * as React from 'react';
import DeckEditorTable from '../deckEditor/DeckEditorTable';
import DeckEditorDetails from '../deckEditor/DeckEditorDetails';
import DeckEditorRelationships from '../deckEditor/DeckEditorRelationships';
import {Collection} from '../../def/Collection';
import ActionButton from '../reusable/ActionButton';
import {Deck} from '../../def/Deck';
import {Helmet} from 'react-helmet';
import {DBSubject} from '../../api/definitions';
import {http} from '../../api/calls';
import {deckGET} from '../../def/deckGET';

interface DeckEditorState {
    options: DBSubject[];
    activeOptions: DBSubject[];
    deck: any;
    words: any[];
    subjects: any[];
    collections: any[];
}

interface DeckEditorProps {
    collections: Collection[];
    addToCollection: any;
    match: any;
}

class DeckEditor extends React.Component<DeckEditorProps, DeckEditorState> {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            words: [],
            activeOptions: [],
            options: [],
            deck: new Deck('Unnamed deck', '', 0, 0, 2, Date.now().toString()),
            collections: undefined
        };
    }

    async componentDidMount() {
        let user_ID = parseInt(this.props.match.params.user);
        let collection_ID = parseInt(this.props.match.params.collections);
        let deck_ID = parseInt(this.props.match.params.deck);
        let deck, words, activeOptions;
        let collections = await http<Collection[]>(
            `http://localhost:3000/collections/find/${user_ID}`
        );
        const subjects: DBSubject[] = await http<DBSubject[]>(' http://localhost:3000/subjects/all/');
        if (user_ID !== undefined && collection_ID !== undefined && deck_ID !== undefined) {
            deck = await http<deckGET>(
                `http://localhost:3000/decks/find/${deck_ID.toString()}`
            );
            activeOptions = deck.subjects;
            words = deck.words;
        }
        this.setState({
            deck: deck,
            options: subjects,
            words: words,
            collections: collections,
            activeOptions: activeOptions
        });
    }

    updateOptions = (e: DBSubject) => {
        console.log('Before');
        console.log(this.state.activeOptions);
        let newOptions = [...this.state.activeOptions, e];
        this.setState({
            activeOptions: [...this.state.activeOptions, e],
            options: this.state.options.filter((o: DBSubject) => o.id !== e.id)
        });
        console.log('After');
        console.log(newOptions);
    };

    changeName = (e: string) => {
        let deck = this.state.deck;
        deck.name = e;
        this.setState({deck: deck});
    };

    changeDescription = (e: string) => {
        let deck = this.state.deck;
        deck.description = e;
        this.setState({deck: deck});
    };

    changeCollection = (e: any) => {
        const index = e.target.selectedIndex;
        const id = e.target.childNodes[index].value;
        let deck = this.state.deck;
        deck.collection_id = parseInt(id);
        this.setState({deck: deck});
    };

    saveDeck = () => {
        //collections.addDeck(this.state.deck);
        this.props.addToCollection(this.state.deck);
    };

    updateWord = (e: any) => {
        // Don't question this :^)
        let obj: { row: number, column: number, subjectID: number } = Object.assign.apply(null, e.target.id.split('&').map((acc) => {
            return acc.split(':');
        }).map(([key, val]) => {
            return ({[key]: parseInt(val)});
        }));
        let words = this.state.words;
        if (words.length < obj.row) {
            words.push({[obj.subjectID]: e.target.value});
        }
        words[obj.row][obj.subjectID] = e.target.value;
        this.setState({words: words});
    };

    updateRelationsShips = () => {

    };

    render() {

        return <>
            <div id={'deck-editor'}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Deck Editor - Tango</title>
                </Helmet>
                <h1>Deck Editor</h1>
                <DeckEditorDetails collections={this.state.collections}
                                   deck={this.state.deck}
                                   changeName={this.changeName}
                                   changeCollection={this.changeCollection}
                                   changeDescription={this.changeDescription}/>
                <DeckEditorTable headers={this.state.activeOptions}
                                 options={this.state.options}
                                 updateOptions={this.updateOptions}
                                 deck={this.state.deck}
                                 words={this.state.words}
                                 onCellChange={this.updateWord}/>
                <DeckEditorRelationships options={this.state.activeOptions}
                                         deck={this.state.deck}
                                         updateRelationships={this.updateRelationsShips}/>
                <ActionButton title={'Save deck'} onClick={this.saveDeck}/>
                <ActionButton title={'Log deck'} onClick={this.logDeck}/>
            </div>
        </>;
    }

    private logDeck = () => {
        console.log(this.state.deck);
    };
}

export default DeckEditor;