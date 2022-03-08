import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonials from '../../Json/testimonials.json'

const Executives = () => {
    const [count, setCount] = useState(0);


    useEffect( () => {
        setTimeout( () => {
            setCount( count === testimonials.length - 1 ? 0 : count+1)
        }, 5000)
    })
    return (
        <>
        <div className='testimonial'>
            <h2 className='testimonial-highlight'>{testimonials[count].highlight}</h2>
            <p className='testimonial-body'>{testimonials[count].body}</p>
            <h3 className='testimonial-reference'>Client's name/company/descriptor of some kind</h3>
        </div>
            <Link to="/contact"> Contact Nicole for a free consultation.</Link>
        </>
    );
};

export default Executives;