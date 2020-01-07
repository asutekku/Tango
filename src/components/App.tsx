import * as React from 'react';
import '../assets/scss/App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';
import Top from './reusable/top';
import Sidepanel from './sidepanel/sidepanel';
import {Collection} from '../def/Collection';
import {Deck} from '../def/Deck';
import Start from './views/Start';
import Study from './views/Study';
import DeckEditor from './views/DeckEditor';
import DeckViewer from './views/DeckViewer';
import PageNotFound from './views/404';
import {Helmet} from 'react-helmet';

export interface AppProps {

}

interface AppState {
    //settings: TangoSettings;
    collections: Collection[];
    userID: number;
}


export default class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {collections: [], userID: 2};
    }

    updateCollections = (c: Collection) => {
        this.setState({collections: [...this.state.collections, c]});
    };

    addDeckToCollection = (deck: Deck) => {
        let collections = this.state.collections;
        let collection = collections.find((c) => c.id === deck.parent);
        collection.addDeck(deck);
        this.setState({collections: collections});

    };

    render() {
        return (
            <div className={'container'}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Tango</title>
                </Helmet>
                <Router>
                    <Sidepanel collections={this.state.collections} updateCollection={this.updateCollections}/>
                    <div id={'content-area'}>
                        <Top/>
                        <div id={'routed-area'}>
                            <Switch>
                                <Route exact path='/' component={Start}/>
                                <Route path='/study/:user/:collection/:deck' render={(props) => <Study{...props}/>}/>
                                <Route path='/deck-editor/:user/:collection/:deck'
                                       render={(props) => <DeckEditor collections={this.state.collections}
                                                                      {...props}
                                                                      addToCollection={this.addDeckToCollection}/>}
                                />
                                <Route path='/deck-viewer/:user/:collection/:deck'
                                       render={(props) => <DeckViewer {...props}/>}/>
                                <Route component={PageNotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
