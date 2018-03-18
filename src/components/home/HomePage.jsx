import React from 'react';
import { Button, Jumbotron, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <Jumbotron fluid>
                <Container fluid className="homepage-container">
                    <h1 className="display-3">Fantasy Football Draft Board</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                    <div>
                        <Button className="primary-button" id="homepage-button-left" tag={Link} to="../account/signin">Sign In</Button>
                        <Button className="primary-button" id="homepage-button-right" tag={Link} to="../account/register">Sign Up</Button>
                    </div>
                </Container>
            </Jumbotron>
        </div>
    );
}
