import React from 'react';
import { Link} from 'react-router-dom';


const ApiSidePanel = ({loggedIn}) => {
    return (
        <div     
            className='api-links-box' 
        >
            <Link  className="api-link" to={loggedIn ? "/api/actors" : '/api'}>
                Review Actors
            </Link>
            <Link  className="api-link" to={loggedIn ? "/api/blogs" : '/api'}>
                Review Blogs
            </Link>
            <Link className="api-link" to={loggedIn ? '/api/testimonials' : '/api/'}>
                Review Testimonials
            </Link>
        </div>
    );
};

export default ApiSidePanel;