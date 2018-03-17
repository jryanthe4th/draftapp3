import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8">
                <h1>HomePage.jsx h1</h1>
                <p>
                    Homepage.jsx p tag
                </p>
                <ul>
                    <li><h4><Link to="/">HomePage.jsx Link1</Link></h4></li>
                    <li><h4><Link to="/">HomePage.jsx Link2</Link></h4></li>
                </ul>
            </div>
        </div>
    );
}
