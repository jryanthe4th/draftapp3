import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

// import '../../css/hamburgers/hamburgers.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <header className="wrapper">
                <Navbar className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark">
                    <NavbarBrand tag={Link} to="/">DynastyDraftBoard</NavbarBrand>
                    <Button className="navbar-toggler" type="button" onClick={this.toggleNavbar} >
                        <span className="navbar-toggler-icon" />
                    </Button>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="navbar-nav ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="../account/signin">Sign In</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="../account/register">Sign Up</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
