import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LoginManager from './components/LoginManager';
import SceneViewer from './components/SceneViewer';
import { connect } from 'react-redux';
import { loadScene } from './state/scene';
import { ActionCreator, AnyAction } from 'redux';

const App = ({ loadScene }: { loadScene: ActionCreator<AnyAction> }) => {
    useEffect(() => {
        loadScene(1);
    }, [loadScene]);

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" fixed="top">
                <Navbar.Brand>
                    <img
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                        alt="Illusa"
                    />
                    Illusa
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <LoginManager />
                </Navbar.Collapse>
            </Navbar>
            <Container fluid style={{ marginTop: 70, marginBottom: 70 }}>
                <SceneViewer />
            </Container>
            <Navbar bg="light" variant="light" fixed="bottom">
                <Navbar.Text className="text-muted text-small">
                    {/* Icons made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/popcorns-arts"
                        title="Icon Pond"
                    >
                        Icon Pond
                    </a>{' '}
                    from{' '}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                        www.flaticon.com
                    </a> */}
                </Navbar.Text>
            </Navbar>
        </>
    );
};

export default connect(null, { loadScene })(App);
