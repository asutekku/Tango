import * as React from 'react';
import {Assignment, language, subjectMode} from '../../def/assignment';

const getWord = (language: language) => {

};

const WordField = (props: { word: Assignment}) => {

    let word = '';

    if (
        props.word.mode === subjectMode.japaneseToFinnish ||
        props.word.mode === subjectMode.japaneseToReading ||
        props.word.mode === subjectMode.radicalToFinnish
    ) {
        word = props.word.japanese;
    } else {
        word = props.word.finnish;
    }

    return (
        <div id={'question-word'}>
            <span className={'assignment'} lang={'word_jp'}>
            {word}
            </span>
        </div>
    );
};

export default WordField;