import React from 'react';
import { connect } from 'react-redux';

import Template from './Template';

class TemplateContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Template />
        );
    }
}

function mapStateToProps(state) {
    return {
        progress: state.progress,
        authentication: state.authentication,
    };
}

export default connect(mapStateToProps)(TemplateContainer);
