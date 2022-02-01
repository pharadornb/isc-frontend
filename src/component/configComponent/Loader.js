import React from "react";
import PropTypes from 'prop-types';
import LoadingScreen from "react-loading-screen";

LoadingScreen.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default function Loader(props) {

    return (
        <>
            <LoadingScreen loading={props.show} bgColor="rgba(0,0,0, 0.5)" spinnerColor="#9ee5f8" />
            {props.children}
        </>
    )
}