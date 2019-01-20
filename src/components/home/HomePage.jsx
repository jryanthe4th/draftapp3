import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        // Bound functions
        this.toggleNavOpen = this.toggleNavOpen.bind(this);

        // Component state
        this.state = {
            navOpen: false
        };
    }

    // Update state as toggleNavOpen value changes
    toggleNavOpen(e) {
        this.setState({ navOpen: true });
    }

    render() {
        return (
            <div className="homepage-container">
                <div className="homepage-background-img" />
                <div>
                    <Button
                        className="primary-button"
                        id="homepage-button-left"
                        tag={Link}
                        to="../account/signin"
                        onClick={this.toggleNavOpen}
                    >
                        SIGN IN
                    </Button>
                    <Button className="primary-button" id="homepage-button-right" tag={Link} to="../account/register">SIGN UP</Button>
                </div>
            </div>
        );
    }
}
