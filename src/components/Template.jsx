import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import HeaderContainer from './shared/HeaderContainer';
import HomePage from './home/HomePageContainer';

export default function Template() {
    return (
        <Router>
            <div className="wrapper">
                <section className="page-content container-fluid">
                    <Route exact path="/" component={HomePage} />
                    <div>
                        <h1>Dynasty DraftBoard</h1>
                    </div>
                </section>
            </div>
        </Router>
    );
}
