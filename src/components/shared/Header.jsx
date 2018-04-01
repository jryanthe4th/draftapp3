import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink, DropdownItem } from 'reactstrap';

// const renderSignin = () => <NavLink tag={Link} to="/account/Signin">Sign In</NavLink>;
const renderSignin = () => (
    <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink tag={Link} to="/account/signin">Sign In</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} to="/account/register">Sign Up</NavLink>
        </NavItem>
    </Nav>
);

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.signOutClick = this.signOutClick.bind(this);
        this.renderGreeting = this.renderGreeting.bind(this);
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

    signOutClick(e) {
        e.preventDefault();
        const { signUserOutFunction } = this.props;
        signUserOutFunction();
    }

    renderGreeting(name) {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="../account/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.signOutClick} tag={Link} to="/signout">Sign Out</NavLink>
                </NavItem>
                <NavItem>
                    <span className="nav-link">Welcome, {name}</span>
                </NavItem>
            </Nav>
        );
    }

    render() {
        const { isSignedIn, firstName, username } = this.props.authentication;
        return (
            <header className="wrapper">
                <Navbar className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark">
                    <NavbarBrand tag={Link} to="/">DynastyDraftBoard</NavbarBrand>
                    <Button className="navbar-toggler" type="button" onClick={this.toggleNavbar} >
                        <span className="navbar-toggler-icon" />
                    </Button>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="navbar-nav ml-auto" navbar>
                            <DropdownItem divider />
                            {/* <NavItem>
                                <NavLink onClick={this.toggleNavbar} tag={Link} to="../account/signin">Sign In</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.toggleNavbar} tag={Link} to="../account/register">Sign Up</NavLink>
                            </NavItem> */}
                            { username && username !== '' ?
                                <NavItem>
                                    <NavLink tag={Link} to="/dashboard2">Dashboard2</NavLink>
                                </NavItem>
                                : null }
                        </Nav>
                        { isSignedIn ? this.renderGreeting(firstName) : renderSignin() }
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
