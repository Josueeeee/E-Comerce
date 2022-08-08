import React from 'react';
import {Spinner} from 'react-bootstrap'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Spinner animation="border" variant="danger" />
        </div>
    );
};

export default LoadingScreen;