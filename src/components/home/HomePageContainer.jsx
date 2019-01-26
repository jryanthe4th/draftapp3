import React from 'react';

import { connect } from 'react-redux';
import HomePage from './HomePage';

export class HomePageContainer extends React.Component {
  render() {
    return (
      <HomePage />
    );
  }
}

export default connect()(HomePageContainer);
