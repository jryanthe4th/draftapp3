import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DashboardPage from './dashboard/DashboardPageContainer';
import ErrorBox from './shared/ErrorBoxContainer';
import ChangePasswordPage from './account/ChangePasswordPageContainer';
import HeaderContainer from './shared/HeaderContainer';
import HomePage from './home/HomePageContainer';
import ProfilePage from './account/ProfilePage';
import RegisterPage from './account/RegisterPageContainer';
import RegistrationSuccessPage from './account/RegistrationSuccessPageContainer';
import ResetPasswordPage from './account/ResetPasswordPageContainer';
import SigninPage from './account/SigninPageContainer';


export default function Template(props) {
  const { authentication, progress } = props;
  return (
    <Router>
      <div className='template-wrapper'>
        <HeaderContainer username='anonymous' authentication={authentication} />
        <div className='page-content container-fluid'>
          <ErrorBox />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/account/signin' component={SigninPage} />
          <Route path='/account/change-password/:hash' component={ChangePasswordPage} />
          <Route exact path='/account/register' component={RegisterPage} />
          <Route exact path='/account/registration-success' component={RegistrationSuccessPage} />
          <Route exact path='/account/reset-password' component={ResetPasswordPage} />
          <Route path='/account/profile/:id' component={ProfilePage} />
          <Route path='/dashboard' component={DashboardPage} />
          <div className='loader-wrapper' style={progress > 0 ? { display: 'block' } : { display: 'none' }}>
            <div className='loader-box'>
              <div className='loader'>Loading...</div>
            </div>
          </div>
        </div>
        <footer>&copy; 2018, DynastyDraftBoard, Inc.</footer>
      </div>
    </Router>
  );
}
