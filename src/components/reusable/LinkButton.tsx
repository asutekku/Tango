import * as React from 'react';
import {Link} from 'react-router-dom';

function LinkButton(props: { title: string, location: string }) {
    return (
        <Link to={props.location}>
            <button type={'button'} className={'basic-button'}>
                {props.title}
            </button>
        </Link>
    );
}

export default LinkButton;