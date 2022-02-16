import React, { useEffect, useRef, useState } from 'react';
import './Test.css';

const Test = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setTimeout( (count) => {
            setCount((count) => count === slides.length-1 ? 0 : count + 1);
            }, 5000)
        }, [count]);

const slides = [
    {
        src: 'https://i.imgur.com/BxDTG47.jpg',
        alt: 'slide1',
    },
    {
        src: 'https://i.imgur.com/BxDTG47.jpg',
        alt: 'slide2',
    },
    {
        src: 'https://i.imgur.com/BxDTG47.jpg',
        alt: 'slide3',
    },
]

const slideshow = () => {
}

    return (
        <>
        <div className='slideshow'>
            <div className="slider" 
                style={{transform: `translate3d(${-count*33}%, 0, 0)`}}
            >
                {slides.map((slide, index) => {
                    return <img className = 'slide' 
                                key={index} 
                                src={`${slide.src}`} 
                                alt={`${slide.alt}`} 
                            />
                })}
            </div>
            <div className="dots">
                {slides.map((_, index) => {
                    return <div className = 'dot' key={index} ></div>
                })}
            </div>
        </div>



        {/* <div className="box">
            <div className='blue'></div>
            <div className='slate'></div>
            <div className='moss'></div>
            <div className='sand'></div>
            <div className='peach'></div>

            <div className='duke'></div>
            <div className='halo'></div>
        </div> */}
        </>

    );
};

export default Test;