import React from 'react';
import ReactDOM from 'react-dom';

function FirstComponent() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">This is first component load</div>
                        <div className="card-body">Hellow world</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FirstComponent;

if (document.getElementById('first-component')) {
    ReactDOM.render(<FirstComponent />, document.getElementById('first-component'));
}
