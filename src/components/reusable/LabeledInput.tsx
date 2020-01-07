import * as React from 'react';

const LabeledInput = (props: { label: string, required: boolean, value?: string, placeHolder?: string, onChange?: any }) => {
    return (
        <div className={'input-container'}>
            <label>{props.label}
                <input type="text"
                       name={props.label.toLowerCase().replace(' ', '-')}
                       required={props.required}
                       placeholder={props.placeHolder}
                       onChange={e => props.onChange(e.target.value)}
                       value={props.value ? props.value : ''}/>
            </label>
        </div>
    );
};

export default LabeledInput;