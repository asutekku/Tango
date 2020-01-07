import * as React from 'react';
import * as Helmet from 'helmet';

const Start = () => {
    return (
        <>
            <div>
                <Helmet>
                    <title>Tango</title>
                </Helmet>
                <h1>Welcome to Tango</h1>
                <p>Tango is a learning service where you can create your own decks and use decks created by others.</p>
            </div>
        </>
    );
};

export default Start;