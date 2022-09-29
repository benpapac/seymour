import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScroll from '../../Hooks/useScrollPosition';
import {Context} from '../../Util/Context';
import { useQuery, gql } from '@apollo/client';


import './Coaching.css';
import './Coaching-Phone.css';

    const TESTIMONIALS_QUERY = gql`
        {
            testimonials {
                id
                name
                occupation
                testimonial
            }
        }
    `;


const Executives = () => {
    //api request, broken when published, works locally???
    const data = useQuery(TESTIMONIALS_QUERY).data;

    // const [count, setCount] = useState(0);
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
        //for when db is properly connected
        let array = data.testimonials.map((test, idx) => {
            // let array = data.map((test, idx) => {

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
            for(let i = 0; i < rects.length; i++){
                if(rects[i].y < 600){
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

                    // setTimeout(() => {
                    //     setDisplay({
                    //         ...display,
                    //         [testimonialFocus.previous]: 'none'
                    //     });
                    // }, 4000);
                }
        }
                
                break;
        
            case 'up':
                for(let i = 0; i < rects.length; i++){
                    if(rects[i].y < 150){
                    // if(i === testimonialFocus.active) return;

                    updateFocus(i, 1);
                    setAnimation({
                        ...animation, 
                        [testimonialFocus.active]:'coaching-slide-in 3s',
                        [testimonialFocus.previous]: 'coaching-slide-out 4s'
                    })
        
                    setAuthorAnimation({
                        ...authorAnimation,
                        [testimonialFocus.active]: 'coaching-appear 3s',
                        [testimonialFocus.previous]: 'coaching-slide-out 4s'
                    })

                    setDisplay({
                    ...display,
                    [testimonialFocus.active]: 'block',
                });

                // setTimeout(() => {
                //     setDisplay({
                //         ...display,
                //         [testimonialFocus.previous]: 'none'
                // });
                // }, 4000);
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
        
        if(data && !initiated){
            // if(window.innerWidth < 1100 && blurbDisplay.display === 'block' ) setTestimonialDisplay({display: 'none'})

            //for when db is properly connected
            let obj = data.testimonials.reduce((accum, testimonial, idx) => {
                // let obj = data.reduce((accum, testimonial, idx) => {
                return {...accum, [idx]: 'none'}
            }, {})
            if(window.innerWidth >= 1100) setDisplay(obj);
            else setDisplay( data.testimonials.reduce((accum, test) => {
                return {...accum, [test.focus]: 'block'}
            }, {})
            )

            setDisplay(obj);
            setAnimation(obj);
            setAuthorAnimation(obj);
            setInitiated(true);
        }
            data && setRects(getDivs());
            updateDivs(getScrollDirection());

    }, [scrollData.y, data]);



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
                {/* for when db is properly connected */}
                {data && data.testimonials.map((testimonial, idx) => {
                // {data.map((testimonial, idx) => {
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