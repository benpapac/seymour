import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonials from '../../Json/testimonials.json'
import { heatMap } from '../../Util/heatMap';
import useScroll from '../../Hooks/useScrollPosition';

import './Coaching.css';
import './Coaching-Phone.css';

const Executives = () => {
    // const [count, setCount] = useState(0);
    console.log(heatMap);
    const scrollData = useScroll();

    const [count, setCount] = useState(0);
    const [testimonial, setTestimonial] = useState(testimonials[count]);
    const [testimonialDisplay, setTestimonialDisplay]  = useState({display: 'block'});
    const [blurbDisplay, setBlurbDisplay] = useState({display: 'block'});

    const increment = () => {
        setCount ( count === testimonials.length-1 ? 0 : count +1);
    }

    const toggleTestimonial = () =>{
        setBlurbDisplay({display: 'none'});
        setTestimonialDisplay({display: 'block'})
    }

    useEffect( () => {
        if(window.innerWidth < 1100 && blurbDisplay.display === 'block' ) setTestimonialDisplay({display: 'none'})
        setTestimonial(testimonials[count]);
    }, [count]);



    return (
        <section className='coaching-bg'>
            <p id='coaching-blurb' style={window.innerWidth < 1100 ? blurbDisplay : null}>
                Coaching feeds my soul.<br/>  When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.
            <br />
            <br />
                It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities.<br/> 
            {window.innerWidth < 1100 ? <button id='testimonial-toggle-button' onClick={toggleTestimonial}>Testimonials</button> : null}
            </p>
            <div className='coaching-filter'/>
            <div id='coaching-bg-one' />
            <img id='coaching-certification' src="https://i.imgur.com/OMdE9uv.png" alt="Nicole's certification" />

            <div className='testimonial' style={testimonialDisplay}>
                <p>{testimonial.copy}</p>
            <h4 id='testimonial-name'>{testimonial.name}</h4>
            <h6 id='testimonial-occupation'>- {testimonial.occupation}</h6>
            </div>

            <button id='testimonial-button' onClick={increment} style={testimonialDisplay}>Next</button>

        </section>
    )
};

export default Executives;