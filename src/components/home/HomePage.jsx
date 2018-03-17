import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8">
                <h1>Welcome to Dynasty DraftBoard</h1>
                <p>
                    This is a draft app.
                </p>
                <ul>
                    <li><h4><Link to="/">Link1</Link></h4></li>
                    <li><h4><Link to="/">Link2</Link></h4></li>
                </ul>
            </div>
        </div>
    );
}
