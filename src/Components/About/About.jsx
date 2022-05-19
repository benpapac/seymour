import {useState, useEffect} from 'react';
import useScrollPosition from '../../Hooks/useScrollPosition';
import useTextWheel from '../../Hooks/ScrollingText';
import { Link } from 'react-router-dom';
import './About.css';


const About = () => {

   const textWheel = useTextWheel();
 
    return (
        <section style={{height: `7000vh`, width: `100vw`}}>
            <img className='about-photo' src="https://i.imgur.com/XNcUYAs.jpg" alt="Nicole in her sitting room" />
            <div className='about-background'/>
            <div className='about-background-two'/>

            <div className='about-text-wheel' style={{ transform: `rotate(${textWheel.angle}deg)`}} >
        <p className='about-blurb' 
            id='one' 
            style={{
                opacity: `${textWheel.opacity[textWheel.angles[0]]}`,
                transform:  `rotate(${textWheel.angles[0]}deg)`,         
            }}>
            I was born and raised in Brooklyn, New York, a vibrant, colorful place where there was no shortage of culture, creativity, and characters.  After majoring in Psychology and minoring in Theater at Binghamton University, I decided that connecting with and learning about people was what made me feel most ALIVE.
        </p>
        <p className='about-blurb'
            id='two' 
            style={{
                opacity: `${textWheel.opacity[textWheel.angles[1]]}`,
                transform:  `rotate(-${textWheel.angles[1]}deg)`, 
                }}>
            I attended Brooklyn College’s School Psychology graduate program and practiced as a psychologist, primarily working with adolescents in the Brooklyn High Schools, for several years.  During this time, I discovered that acting helped me be of better service to others.  It was my therapy- I took numerous acting classes and performed regularly with a theater company.  Performing was always about uncovering new layers of myself and about the impact I could have on others.
        </p>
        <p className='about-blurb'
            id='three'
            style={{
                opacity: `${textWheel.opacity[textWheel.angles[2]]}`,
                transform: `rotate(-${textWheel.angles[2]}deg)`,
            }}>
            In 2005, my husband and I moved to Los Angeles for what was supposed to be a brief adventure, but we started thriving in our careers and loved the weather, so we decided to stay.  In 2009, I had the idea to combine my passions for creativity and helping others and LG Management was born (coincidentally my daughter was also born that year
        </p>
        </div>
        </section>
    );
};

export default About;