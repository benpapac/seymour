import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonials from '../../Json/testimonials.json'
import { heatMap } from '../../Util/heatMap';
import useScroll from '../../Hooks/useScrollPosition';

import './Coaching.css';

const Executives = () => {
    // const [count, setCount] = useState(0);
    console.log(heatMap);
    const scrollData = useScroll();

    const [count, setCount] = useState(0);
    const [testimonial, setTestimonial] = useState(testimonials[count]);

    const increment = () => {
        setCount ( count === testimonials.length-1 ? 0 : count +1);
        // setAngle( angle >= 365 ? 365 : angle + 1);
    }

    useEffect( () => {
        setTestimonial(testimonials[count]);
    }, [count]);

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
        <>
        <p id='coaching-blurb'>
            Coaching feeds my soul.<br/>  When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.
           <br />
           <br />
             It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities. 
        </p>
        <div id='coaching-bg-one' />
        <div id='coaching-bg-two'/>
        <img id='coaching-certification' src="https://i.imgur.com/OMdE9uv.png" alt="Nicole's certification" />

        <div className='testimonial'>
            <p>{testimonial.copy}</p>
        </div>
            <h4 id='testimonial-name'>{testimonial.name}</h4>
            <h6 id='testimonial-occupation'>- {testimonial.occupation}</h6>
            <button id='testimonial-button' onClick={increment}>Next</button>
        </>
    )
};

export default Executives;