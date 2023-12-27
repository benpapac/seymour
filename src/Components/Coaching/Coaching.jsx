import React, { useContext, useEffect, useRef } from 'react';
import {Context} from '../../Util/Context';


import './Coaching.css';
import './Coaching-Phone.css';
import Testimonial from './Testimonial';
import { useQuery } from '@apollo/client';
import {TESTIMONIALS_QUERY} from '../../Util/GraphQL';

const Executives = () => {
    const itemsRef = useRef(null);
    const testimonialsData = useQuery(TESTIMONIALS_QUERY).data?.testimonials;

    const blurbDisplay = {display: 'block'};

    useEffect(() => {
        window.scroll(0,0);
    })

    const getMap = () => {
        if(!itemsRef.current) {
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    return (
        <section className='coaching-bg'>

            <div id='coaching-blurb' style={window.innerWidth < 1100 ? blurbDisplay : null}>
                <p>
                    {'Coaching feeds my soul.'}
                    <br/>
                    {'When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.'}
                    <br />
                    <br />
                    {'It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities.'}
                </p>
                <div className='coaching-deco-box'>
                    <p>{'Scroll down to hear from Nicole\'s clients.'}

                <img id='coaching-certification' src="https://i.imgur.com/OMdE9uv.png" alt="Nicole's certification" />
                </p>
                </div>
            </div>

            <div className='testimonials-box'>
                {testimonialsData && testimonialsData.map((testimonial, idx) => {
        
                    return (
                        <Testimonial className='testimonial' 
                        id={`${testimonial.id}`}
                        key={`${testimonial.id}`}

                        // https://beta.reactjs.org/learn/manipulating-the-dom-with-refs
                        ref={(node) => {
                            const map = getMap();
                            if(node){
                                map.set(testimonial.id, node);
                            } else {
                                map.delete(testimonial.id);
                            };
                        }}

                        testimonial={testimonial}
                    />
                    )
                })}
            </div>

        </section>
    )
};

export default Executives;