import * as React from 'react';

const GenericInput = (props: { placeHolder?: string, onChange?: any, onEnter?: any, autofocus?: boolean }) => {

    let onEnter = (e: any) => {
        if (e.key === 'Enter') {
            props.onEnter(e.target.value);
        }
    };

    return (
        <input type="text"
               placeholder={props.placeHolder}
               onKeyDown={onEnter}
               autoFocus={props.autofocus}
        />
    );
};

export default GenericInput;