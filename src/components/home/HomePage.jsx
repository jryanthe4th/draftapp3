import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8">
                <h1>HomePage Content</h1>
                <p>
                    Homepage paragraph
                </p>
                <ul>
                    <li><h5><Link to="/">HomePage Link1</Link></h5></li>
                    <li><h5><Link to="/">HomePage Link2</Link></h5></li>
                </ul>
            </div>
        </div>
    );
}
