import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScroll from '../../Hooks/useScrollPosition';
import {Context} from '../../Util/Context';
import { scrollDown, scrollUp } from '../../Util/Callbacks';


import './Coaching.css';
import './Coaching-Phone.css';




const Executives = () => {
    // const [count, setCount] = useState(0);
    const scrollData = useScroll();
    const context = useContext(Context);
    const {setTestimonialFocus, testimonialsData, setRects, animation, setAnimation, authorAnimation, setAuthorAnimation, display, setDisplay} = useContext(Context);


    const [initiated, setInitiated] = useState(false);
    const [blurbDisplay, setBlurbDisplay] = useState({display: 'block'});
    
    const [oldY, setOldY] = useState(0);


   

     const getDivs = () => {
        let array = testimonialsData.testimonials.map((test, idx) => {
            let linksBox = document.getElementById(`${test.id}`) || null;
            
            let coachingRect = linksBox.getBoundingClientRect();
            return coachingRect;
        })
    return array;
     }

     const getScrollDirection = () => {

        if(scrollData.y > oldY) {
            return 'down';
        } else if(scrollData.y - oldY < 0) {
            return 'up'
        } else return 'neutral';
     }


     const updateDivs = (direction) => {
        switch (direction) {
            case 'down':
                 scrollDown(context);
                 break;
            case 'up':
               scrollUp(context);
                break;
            default:
                break;
        }
        
     }

    useEffect( () => {
        setOldY(scrollData.y);
        
        if(testimonialsData && !initiated){

            let obj = testimonialsData.testimonials.reduce((accum, testimonial, idx) => {
                return {...accum, [idx]: 'none'}
            }, {})
            if(window.innerWidth >= 1100) setDisplay(obj);
            else setDisplay( testimonialsData.testimonials.reduce((accum, test) => {
                return {...accum, [test.focus]: 'block'}
            }, {})
            )

            setDisplay(obj);
            setAnimation(obj);
            setAuthorAnimation(obj);
            setInitiated(true);
        }
            testimonialsData && setRects(getDivs());
            updateDivs(getScrollDirection());

    }, [scrollData.y, testimonialsData]);


    return (
        <section className='coaching-bg'>

            <div id='coaching-blurb' style={window.innerWidth < 1100 ? blurbDisplay : null}>
                <p>
                    Coaching feeds my soul.
                    <br/>
                    When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.
                    <br />
                    <br />
                    It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities.
                </p>
                <div className='coaching-deco-box'>
                    <p>Scroll down to hear from Nicole's clients.

                <img id='coaching-certification' src="https://i.imgur.com/OMdE9uv.png" alt="Nicole's certification" />
                </p>
                </div>
            </div>

            <div className='testimonials-box'>
                {testimonialsData && testimonialsData.testimonials.map((testimonial, idx) => {
                    return (
                        <div className='testimonial' 
                        id={`${testimonial.id}`}
                        // ref={focusPoints[`${testimonial.focus}`]}
                    >
                            <p style={{ display: `${display[idx]}`, animation: `${animation[idx]}`}}>{testimonial.testimonial}</p>
                            <h4 style={{ display:` ${display[idx]}`, animation: `${authorAnimation[idx]}`}}>{testimonial.name}</h4>
                            <h6 style={{ display: `${display[idx]}`, animation: `${authorAnimation[idx]}`}}>- {testimonial.occupation}</h6>
                        </div>
                    )
                })}
            </div>

        </section>
    )
};

export default Executives;