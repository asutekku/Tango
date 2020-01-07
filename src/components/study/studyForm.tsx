import * as React from 'react';
import {Assignment, subjectMode} from '../../def/assignment';
import {toKana} from 'wanakana';


interface FormState {
    value: string;
}

interface FormProps {
    word: Assignment;
    onCorrect: any;
    onIncorrect: any;
}

class StudyForm extends React.Component<FormProps, FormState> {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let val = e.target.value;
        if ((this.props.word.mode === subjectMode.japaneseToReading ||
            this.props.word.mode === subjectMode.finnishToJapanese)
        ) {
            val = toKana(val, {customKanaMapping: {n: 'n', nn: 'ん'}});
        }
        this.setState({value: val.toLowerCase()});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let correct = false;
        console.log(this.state.value);
        if (
            this.props.word.mode === subjectMode.japaneseToFinnish &&
            this.state.value === this.props.word.finnish.toLowerCase()
        ) {
            correct = true;
        } else if (
            (
                this.props.word.mode === subjectMode.finnishToJapanese ||
                this.props.word.mode === subjectMode.japaneseToReading) &&
            (
                this.state.value === this.props.word.reading.toLowerCase() ||
                this.state.value === this.props.word.japanese.toLowerCase()
            )
        ) {
            correct = true;
        } else if (
            this.props.word.mode === subjectMode.radicalToFinnish &&
            this.state.value === this.props.word.finnish.toLowerCase()
        ) {
            correct = true;
        }
        console.log(correct);
        if (correct) {
            console.log('Correct');
            this.props.onCorrect('correct');
            this.setState({value: ''});
        }
    };

    render() {

        return (
            <div id={'question-submit'}>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type={'text'} name={'study-input'} id={'study-input'} onChange={this.handleChange}
                               value={this.state.value}/>
                        <button type={'submit'}>
                            <span>></span>
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default StudyForm;