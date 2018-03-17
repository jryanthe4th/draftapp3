// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
//
// export default class Header extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             isOpen: false,
//         };
//     }
//
//     toggleNavbar() {
//         this.setState({
//             isOpen: !this.state.isOpen,
//         });
//     }
//
//     render() {
//         return (
//             <Header className="wrapper">
//                 <Navbar toggleable>
//                     <NavbarToggler right onClick={this.toggleNavbar} />
//                     <NavbarBrand tag={Link} to="/">DynastyDraftBoard</NavbarBrand>
//                     <Collapse isOpen={this.state.isOpen} navbar>
//                         <Nav className="ml-auto" navbar>
//                             <NavItem>
//                                 <NavLink tag={Link} to="/">Page1</NavLink>
//                             </NavItem>
//                             <NavItem>
//                                 <NavLink tag={Link} to="/">Page2</NavLink>
//                             </NavItem>
//                         </Nav>
//                     </Collapse>
//                 </Navbar>
//             </Header>
//         );
//     }
// }
