import React from 'react';
import { Link } from 'react-router-dom';

const Executives = () => {
    return (
        <div className='testimonial'>
            <h2>TEASER QUOTE</h2>
            <p>Full quote goes here. Description of Nicole's impact on this client's career and life. Preferably with an anecdote about a real world outcome the client enjoyed.</p>
            <h3>Client's name/company/descriptor of some kind</h3>
            <Link to="/contact"> Contact Nicole for a free consultation.</Link>
        </div>
    );
};

export default Executives;