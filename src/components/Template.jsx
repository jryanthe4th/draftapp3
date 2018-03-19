import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from './shared/HeaderContainer';
import HomePage from './home/HomePageContainer';
import SigninPage from './account/SigninPageContainer';
import RegisterPage from './account/RegisterPageContainer';

export default function Template(props) {
    const { progress } = props;
    return (
        <Router>
            <div className="template-wrapper">
                <HeaderContainer />
                <section className="page-content container-fluid">
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/account/signin" component={SigninPage} />
                    <Route exact path="/account/register" component={RegisterPage} />
                    <div className="loader-wrapper" style={progress > 0 ? { display: 'block' } : { display: 'none' }}>
                        <div className="loader-box">
                            <div className="loader">Loading...</div>
                        </div>
                    </div>
                </section>
                <footer>&copy; 2018, DynastyDraftBoard, Inc.</footer>
            </div>
        </Router>
    );
}
