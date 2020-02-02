import React from 'react';

//If the user is not authenticated and tries to access a private path this component is rendered
export default function Forbidden() {
    return(
        <div>
            <hr />
            <div className="bounds">
                <h1>Forbidden</h1>
                <p>Oh oh! You can't access this page.</p>
            </div>
        </div>
    );
}
