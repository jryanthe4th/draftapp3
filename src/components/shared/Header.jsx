import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
                <Navbar light toggleable>
                    <NavbarBrand tag={Link} to="/">NavbarBrand</NavbarBrand>
                    <NavbarToggler right onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">Header.jsx Link A</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/">Header.jsx Link B</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
