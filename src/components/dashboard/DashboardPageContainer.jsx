import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userClearList, userLookup } from '../../actions/users';

import DashboardPage from './DashboardPage';

class DashboardPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    const { match, userLookupFunction } = this.props;
    userLookupFunction(match.params.username);
  }

  componentWillReceiveProps(nextProps) {
    const {} = this.props;
    const { dashboard } = nextProps;
  }

  componentWillUnmount() {
    const { userClearListFunction } = this.props;
    userClearListFunction();
  }

  render() {
    const { authentication, dashboard } = this.props;
    if (authentication.username === '') {
      return (<p>You must be logged in to view this awesomeness</p>);
    }

    return (
      <DashboardPage
        authentication={authentication}
        username={authentication.username}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  userClearListFunction: userClearList,
  userLookupFunction: userLookup,
  dispatch,
}, dispatch);

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  authentication: state.authentication,
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPageContainer);
