import React from 'react';
import { connect } from 'react-redux';
import { signUserOut } from '../../actions/authentication';

import Header from './Header';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.signUserOutFunction = this.signUserOutFunction.bind(this);
  }

  signUserOutFunction() {
    const { dispatch } = this.props;
    dispatch(signUserOut());
  }

  render() {
    const { authentication } = this.props;
    return (
      <Header authentication={authentication} signUserOutFunction={this.signUserOutFunction} />
    );
  }
}

export default connect()(HeaderContainer);
