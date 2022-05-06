import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonials from '../../Json/testimonials.json'
import { heatMap } from '../../Util/heatMap';

import './Coaching.css';

const Executives = () => {
    // const [count, setCount] = useState(0);
    console.log(heatMap);

    // useEffect( () => {
    //     setTimeout( () => {
    //         setCount( count === testimonials.length - 1 ? 0 : count+1)
    //     }, 5000)
    // })
    // return (
    //     <>
    //     <div className='testimonial'>
    //         <h2 className='testimonial-highlight'>{testimonials[count].highlight}</h2>
    //         <p className='testimonial-body'>{testimonials[count].body}</p>
    //         <h3 className='testimonial-reference'>Client's name/company/descriptor of some kind</h3>
    //     </div>
    //         <Link to="/contact"> Contact Nicole for a free consultation.</Link>
    //     </>
    // );

    return (
        <section className='coaching'>
        <p>
           Through the The International Federation of Coaches, I became a Professional Certified Coach.  Coaching feeds my soul.  When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.  It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities. 
        </p>
        </section>
    )
};

export default Executives;