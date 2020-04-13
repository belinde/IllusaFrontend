import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LoginManager from './components/LoginManager';
import LocationViewer from './components/LocationViewer';

function App() {
    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top">
                <Navbar.Brand>
                    <img
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                        alt="React Bootstrap logo"
                    />
                    Illusa
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <LoginManager />
                </Navbar.Collapse>
            </Navbar>
            <Container fluid style={{ marginTop: 70 }}>
                <LocationViewer />
            </Container>
        </>
    );
}

export default App;
