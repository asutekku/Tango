import * as React from 'react';
import StudyForm from '../study/studyForm';
import WordField from '../study/wordField';
import {Assignment, subjectMode} from '../../def/assignment';
import StudyHint from '../study/StudyHint';

let w: any[] = require('../../assets/dict/jp_fi.json');


let words = w.map((k: any) => {
    return new Assignment(k.id, k.subjectID, k.jp_word, k.jp_reading, k.fi_word);
}).sort((a, b) => (a.level > b.level) ? 1 : -1);

let completed: Assignment[] = [];


interface StudyState {
    word: Assignment;
    mode: subjectMode;
}

interface StudyProps {
}

class Study extends React.Component<StudyProps, StudyState> {
    constructor(props) {
        super(props);
        this.state = {
            word: words[0], mode: subjectMode.japaneseToFinnish
        };
    }

    componentDidMount(): void {
    }

    render() {
        return <>
            <div id={'question'}>
                <WordField word={this.state.word}/>
                <StudyHint word={this.state.word}/>
                <StudyForm word={this.state.word} onCorrect={this.onCorrect} onIncorrect={this.onIncorrect}/>
            </div>
        </>;
    }

    onIncorrect = () => {
        if (this.state.word.mode === subjectMode.japaneseToReading) {
            this.state.word.subject_jp_reading_failed = true;
        } else if (this.state.word.mode === subjectMode.japaneseToFinnish) {
            this.state.word.subject_jp_failed = true;
        } else if (this.state.word.mode === subjectMode.finnishToJapanese) {
            this.state.word.subject_fi_failed = true;
        }
    };

    onCorrect = () => {
        let word = this.state.word;
        if (word.mode === subjectMode.japaneseToFinnish) {
            word.nextMode();
        } else if (word.mode === subjectMode.japaneseToReading) {
            word.nextMode();
        } else if (word.mode === subjectMode.finnishToJapanese) {
            completed.push(word);
            console.log('done');
            let id = word.subject_id;
            for (let i = 0; i < words.length; i++) {
                if (words[i].subject_id === id) {
                    words.splice(i, 1);
                    break;
                }
            }
            if (words.length >= 1) {
                word = words[0];
            }
        }
        this.setState({word: word});
    };
}

export default Study;