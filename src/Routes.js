import React from 'react';
import {Switch} from 'react-router-dom';
import RouteWithLayout from './component/RouteWithLayout';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/homePage/HomePage';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <RouteWithLayout
                    exact
                    path="/"
                    component={HomePage}
                    layout={MainLayout}
                />
            </Switch>
        );
    }
}