import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink, DropdownItem } from 'reactstrap';

// // const renderLogin = () => <NavLink tag={Link} to="/account/login">Log In</NavLink>;
// const renderLogin = () => (
//     <Nav className="ml-auto" navbar>
//         <NavItem>
//             <NavLink tag={Link} to="/account/login">Sign In</NavLink>
//         </NavItem>
//         <NavItem>
//             <NavLink tag={Link} to="/account/register">Sign Up</NavLink>
//         </NavItem>
//     </Nav>
// );

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logOutClick = this.logOutClick.bind(this);
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

    logOutClick(e) {
        e.preventDefault();
        const { logUserOutFunction } = this.props;
        logUserOutFunction();
    }

    renderGreeting(name) {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <span className="nav-link">Welcome, {name}
                        | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
                    </span>
                </NavItem>
            </Nav>
        );
    }

    render() {
        // const { isLoggedIn, firstName, username } = this.props.authentication;
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
                            <NavItem>
                                <NavLink onClick={this.toggleNavbar} tag={Link} to="../account/signin">Sign In</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.toggleNavbar} tag={Link} to="../account/register">Sign Up</NavLink>
                            </NavItem>
                        </Nav>
                        {/* { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() } */}
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
