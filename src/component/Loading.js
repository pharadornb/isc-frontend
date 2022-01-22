import React from "react";
import ReactLoading from 'react-loading';

import '../css/load.css';

export default function Loading() {
    return(
        <div className="loader-container">
            <div className="loader">
                <ReactLoading type="spin" color="#2E2E48" width={40} />
            </div>
        </div>
    )
}
