import * as React from 'react';
import {Assignment, subjectMode, wordType} from '../../def/assignment';

/**
 * Hint given to the user
 * @param props
 * @constructor
 */
const StudyHint = (props: { word: Assignment }) => {

    let string = '';

    if (props.word.mode === subjectMode.japaneseToFinnish && props.word.type === wordType.word) {
        string = 'Sana suomeksi';
    } else if (props.word.mode === subjectMode.japaneseToReading && props.word.type === wordType.word) {
        string = 'Sanan lukutapa';
    } else if (props.word.mode === subjectMode.finnishToJapanese && props.word.type === wordType.word) {
        string = 'Sana japaniksi';
    } else if (props.word.mode === subjectMode.japaneseToFinnish && props.word.type === wordType.kanji) {
        string = 'Kanji suomeksi';
    } else if (props.word.mode === subjectMode.japaneseToReading && props.word.type === wordType.kanji) {
        string = 'Kanjin lukutapa';
    } else if (props.word.mode === subjectMode.finnishToJapanese && props.word.type === wordType.kanji) {
        string = 'Kanji japaniksi';
    } else if (props.word.mode === subjectMode.radicalToFinnish && props.word.type === wordType.radical) {
        string = 'Radikaalin merkitys';
    } else {
        string = 'Hups, sanan tyypissa on virhe.';
    }

    return (
        <div className={'study-hint'}>
            <p>
                {string}
            </p>
        </div>
    );
};

export default StudyHint;