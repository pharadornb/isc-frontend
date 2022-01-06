import React from 'react';
import PropTypes from 'prop-types';

export class MainLayout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                header
                <main>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default MainLayout;