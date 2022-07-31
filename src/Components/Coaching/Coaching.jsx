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

    const updateFocus = (idx, value) => {
        setTestimonialFocus({
            active: idx,
            previous: idx + value,
            newState: true,
        })
        // setTimeout( () => {
        //     chooseFocus(e)
        // }, "500") ;
    }

    const [initiated, setInitiated] = useState(false);
    const [blurbDisplay, setBlurbDisplay] = useState({display: 'block'});

    //below state is copied from Home.jsx. I should refactor into a custom component. Could be publishable!
    const [animation, setAnimation] = useState([]);
    const [display, setDisplay] = useState([]);
    const [authorAnimation, setAuthorAnimation] = useState([]);
    const [rects, setRects] = useState([]);
    const [oldY, setOldY] = useState(0);


   

     const getDivs = () => {
        let array = testimonials.map((test, idx) => {
            let linksBox = document.getElementById(`${test.focus}`) || null;
            
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
            for(let i = 0; i < rects.length; i++){
                if(rects[i].y < 530){
                    // if(i === testimonialFocus.active) return;
                    updateFocus(i, -1);
                    setAnimation({
                        ...animation, 
                        [testimonialFocus.active]:'coaching-slide-in 3s',
                        [testimonialFocus.previous]: 'coaching-slide-up 4s'
                    })
                    
                    setAuthorAnimation({
                        ...authorAnimation,
                        [testimonialFocus.active]: 'coaching-appear 3s',
                        [testimonialFocus.previous]: 'coaching-slide-up 4s'
                    })
                    
                    setDisplay({
                        ...display,
                        [testimonialFocus.active]: 'block',
                    });
                    console.log(testimonialFocus);
                }
        }
                
                break;
        
            case 'up':
                for(let i = 0; i < rects.length; i++){
                    if(rects[i].y < 100){
                    // if(i === testimonialFocus.active) return;

                    updateFocus(i, 1);
                        console.log(i === testimonialFocus.active);
                    setAnimation({
                        ...animation, 
                        [testimonialFocus.active]:'coaching-slide-in 3s',
                        [testimonialFocus.previous]: 'coaching-slide-down 4s'
                    })
        
                    setAuthorAnimation({
                        ...authorAnimation,
                        [testimonialFocus.active]: 'coaching-appear 3s',
                        [testimonialFocus.previous]: 'coaching-slide-down 4s'
                    })

                    setDisplay({
                    ...display,
                    [testimonialFocus.active]: 'block',
                });

                setTimeout(() => {
                    setDisplay({
                        ...display,
                        [testimonialFocus.previous]: 'none'
                });
                }, 4000);
            }
        }
                break;
            default:
                break;
        }
        
     }

    useEffect( () => {
        setOldY(scrollData.y);
        //all rects logic copied from Home.jsx, and should become part of custom component. Could be publishable!
        let oldY = scrollData.y;
        
        if(!initiated){
            // if(window.innerWidth < 1100 && blurbDisplay.display === 'block' ) setTestimonialDisplay({display: 'none'})
            let obj = testimonials.reduce((accum, testimonial, idx) => {
                return [...accum, accum[idx] = 'none']
            }, {})
            // if(window.innerWidth >= 1100) setDisplay(obj);
            // else setDisplay( testimonials.reduce((accum, test) => {
            //     return {...accum, [test.focus]: 'block'}
            // }, {})
            // )

            setDisplay(obj);
            setAnimation(obj);
            setAuthorAnimation(obj);
            setInitiated(true);
        }
            setRects(getDivs());
            updateDivs(getScrollDirection());

    }, [scrollData.y]);



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
                    <br/> <br/>
                    <span>Scroll down to hear from Nicole's clients.</span>
                </p>
            </div>

            <img id='coaching-certification' src="https://i.imgur.com/OMdE9uv.png" alt="Nicole's certification" />

            {/* <div id='testimonials-authors-box' onClick={updateFocus}>
                { testimonials.map(testimonial => {
                    return (
                        <div className='author' id={`author-${testimonial.focus}`} >
                        <h4 className='testimonial-name'>{testimonial.name}</h4>
                        <h6 className='testimonial-occupation'>- {testimonial.occupation}</h6>
                        </div>
                    )
                })}
            </div> */}

            <div className='testimonials-box'>
                {testimonials.map((testimonial, idx) => {
                    return (
                        <div className='testimonial' 
                        id={`${testimonial.focus}`}
                        ref={focusPoints[`${testimonial.focus}`]}
                        >
                            <p style={{ display: `${display[idx]}`, animation: `${animation[idx]}`}}>{testimonial.copy}</p>
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