import React from 'react';

//If api requests return a 500 Internal Server Error this component will render
export default function Error() {
    return(
        <div>
        <hr />
        <div className="bounds">
          <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
      </div>
    );
}
