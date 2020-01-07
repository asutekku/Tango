import * as React from 'react';
import {Component} from 'react';
import LinkButton from '../reusable/LinkButton';
import ActionButton from '../reusable/ActionButton';
import {Collection} from '../../def/Collection';
import SidepanelLibrary from './SidepanelLibrary';

interface SideProps {
    collections: Collection[];
    updateCollection: any;
}

interface SideState {
    creatingCollection: boolean;
}

class Sidepanel extends Component<SideProps, SideState> {
    constructor(props) {
        super(props);
        this.state = {creatingCollection: false};
    }

    createCollection = () => {
        this.setState({creatingCollection: true});
    };

    componentDidMount(): void {

    }

    saveCollection = (e: string) => {
        console.log(e);
        this.setState({creatingCollection: false});
        let newCollection = new Collection(0, e, 2, '', Date.now().toString());
        this.props.updateCollection(newCollection);
    };

    /**
     * TODO: Move 'Create DBCollection' button to next to Collections header as single +
     */
    render() {
        return <>
            <nav id={'sidePanel'}>
                <ActionButton title={'New DBCollection'} onClick={this.createCollection}/>
                <LinkButton title={'New deck'} location={'/deck-editor'}/>
                <h3>Your Collections</h3>
                <SidepanelLibrary userID={2}/>
            </nav>
        </>;
    }
}

export default Sidepanel;