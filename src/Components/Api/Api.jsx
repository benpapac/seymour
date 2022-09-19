import React from 'react';
import {useNavigate} from 'react-router-dom';

const Api = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={()=> navigate('/actors')}>
                review actors
            </button>
            <button onClick={()=> navigate('/testimonials')}>
                review testimonials
            </button>

        </div>
    );
};

export default Api;