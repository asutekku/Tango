import * as React from 'react';

function ActionButton(props: { title: string, onClick: any }) {
    return (
        <button type={'button'} className={'basic-button'} onClick={props.onClick}>
            {props.title}
        </button>
    );
}

export default ActionButton;