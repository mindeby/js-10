import React from 'react';

//If the requested route doesn't exist render this Functional component
export default function NotFound() {
    return(
        <div>
            <hr />
            <div className="bounds">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </div>
    );
}
