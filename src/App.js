import React from 'react';
import {Router} from 'react-router-dom';
import Routes from './Routes';
import {createBrowserHistory} from 'history';
import './App.css';

function App() {
    const browserHistory = createBrowserHistory({
        /* pass a configuration object here if needed */
    });

    return (
        <Router history={browserHistory}>
            <React.Fragment>
                <Routes />
            </React.Fragment>
        </Router>
    );
}

export default App;