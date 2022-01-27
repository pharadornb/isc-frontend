import React from "react";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import PropTypes from 'prop-types';
import "./LoaderStyle.css"

LoadingOverlay.propTypes = {
    active: PropTypes.bool.isRequired,
};

export default function Loader(props) {

    return(
        <LoadingOverlay className="loader" active={props.show}
                        spinner={<PuffLoader color={'#4A90E2'}/>}>
            {props.children}
        </LoadingOverlay>
    )
}