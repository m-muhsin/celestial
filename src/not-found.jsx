import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div id="content">
        <div className="container post-entry">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">404 Page Not Found!</h4>
                    <p className="card-text">The page you requested does not exist.</p>
                    <p className="card-text"><Link to={CelestialSettings.path}>Return to homepage</Link></p>
                </div>
            </div>
        </div>
    </div>
);

export default NotFound;