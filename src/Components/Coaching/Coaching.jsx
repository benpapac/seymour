import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonials from '../../Json/testimonials.json';
import { heatMap } from '../../Util/heatMap';
import useScroll from '../../Hooks/useScrollPosition';
import {Context} from '../../Util/Context';

import './Coaching.css';
import './Coaching-Phone.css';

const Executives = () => {
    // const [count, setCount] = useState(0);
    // console.log(heatMap);
    const scrollData = useScroll();

    const context = useContext(Context);
    const focusPoints = context.focusPoints;
    const chooseFocus = context.chooseFocus;

    
    const [testimonialFocus, setTestimonialFocus] = useState({
        active: null, previous: null, newState: false,
    })

    const updateFocus = (e) => {
        if(e.target.parentElement.id.substring(7) === testimonialFocus.active) return;
        let prev = testimonialFocus.active;
        setTestimonialFocus({
            active: e.target.parentElement.id.substring(7),
            previous: prev,
            newState: true,
        })
        setTimeout( () => {
            chooseFocus(e)
        }, "500") ;
    }

    const [initiated, setInitiated] = useState(false);
    const [testimonialDisplay, setTestimonialDisplay]  = useState({display: 'block'});
    const [blurbDisplay, setBlurbDisplay] = useState({display: 'block'});

    //below state is copied from Home.jsx. I should refactor into a custom component. Could be publishable!
    const [animation, setAnimation] = useState({});
    const [display, setDisplay] = useState({});
    const [authorAnimation, setAuthorAnimation] = useState({});
    const [rects, setRects] = useState({});


    const toggleTestimonial = () =>{
        setBlurbDisplay({display: 'none'});
        setTestimonialDisplay({display: 'block'})
    }

     const getDivs = () => {
        let array = testimonials.map((test, idx) => {
            let linksBox = document.getElementById(`${test.focus}`) || null;
            
            let coachingRect = linksBox.getBoundingClientRect();
            return { idx: coachingRect};
        })
    return array;
     }

    useEffect( () => {
        // setTestimonial(testimonials[count]);
        
        //all rects logic copied from Home.jsx, and should become part of custom component. Could be publishable!
        
        if(!initiated){
            if(window.innerWidth < 1100 && blurbDisplay.display === 'block' ) setTestimonialDisplay({display: 'none'})
            let obj = testimonials.reduce((accum, testimonial) => {
                return {...accum, [testimonial.focus]: 'none'}
            }, {})
            setDisplay(obj);
            setAnimation(obj);
            setAuthorAnimation(obj);
            setRects(getDivs());
            setInitiated(true);
        }

         if(testimonialFocus.newState === true) {
            setAnimation({
                ...animation, 
                [testimonialFocus.active]:'coaching-slide-in 4s',
                [testimonialFocus.previous]: 'coaching-slide-up 1s'
            })

            setDisplay({
                ...display,
                [testimonialFocus.active]: 'block',
            });


            setAuthorAnimation({
                ...authorAnimation,
                [testimonialFocus.active]: 'coaching-appear 3s',
                [testimonialFocus.previous]: 'coaching-slide-up 1s'
            })

            setTestimonialFocus({
                ...testimonialFocus,
                newState: false
            })
            console.log(display);
        } 

    }, [testimonialFocus.newState]);



    return (
        <section className='coaching-bg'>
            <div id='coaching-blurb' style={window.innerWidth < 1100 ? blurbDisplay : null}>
                <p>
                Coaching feeds my soul.<br/>  When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.
            <br />
            <br />
                It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities.<br/> 
                </p>
            {window.innerWidth < 1100 ? <button id='testimonial-toggle-button' onClick={toggleTestimonial}>Testimonials</button> : null}
            </div>
            {/* <div id='coaching-bg-one' /> */}
            <img id='coaching-certification' src="https://i.imgur.com/OMdE9uv.png" alt="Nicole's certification" />

            <div id='testimonials-authors-box' onClick={updateFocus}>
                { testimonials.map(testimonial => {
                    return (
                        <div className='author' id={`author-${testimonial.focus}`} >
                        <h4 className='testimonial-name'>{testimonial.name}</h4>
                        <h6 className='testimonial-occupation'>- {testimonial.occupation}</h6>
                        </div>
                    )
                })}
            </div>

            <div className='testimonials-box'>
                {testimonials.map((testimonial, idx) => {
                    return (
                        <div className='testimonial' 
                        id={`${testimonial.focus}`}
                        ref={focusPoints[`${testimonial.focus}`]}
                        >
                            <p style={{ display: `${display[testimonial.focus]}`, animation: `${animation[testimonial.focus]}`}}>{testimonial.copy}</p>
                            <h4 style={{ display: `${display[testimonial.focus]}`, animation: `${authorAnimation[testimonial.focus]}`}}>{testimonial.name}</h4>
                            <h6 style={{ display: `${display[testimonial.focus]}`, animation: `${authorAnimation[testimonial.focus]}`}}>- {testimonial.occupation}</h6>
                        </div>
                    )

                })}
            </div>

        </section>
    )
};

export default Executives;