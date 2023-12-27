import {useState, useReducer, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import useScrollPosition from '../../Hooks/useScrollPosition';
import portrait from '../../Assets/Nicole_Portrait.jpeg'
import './About.css';
import './PhoneAbout.css';
import aboutMe from '../../Json/aboutMe.json';


const About = () => {
   const grafs = aboutMe[0].grafs;

   const scrollHeight = useScrollPosition();

   useEffect(()=>{
    window.scroll(0,0);
   },[]);
 
    return (
        <>

            <div className='about-bg' />
            <img className='about-photo' src={portrait} alt="Nicole in her sitting room" />
            {grafs.map((graf, idx) => (
                <div key={idx} className={'about-blurb'} >
                    <p>{graf}</p>
                </div>
            ))}
        
            <div 
                id={scrollHeight.y < 300 ? 'invisible' : null}
                className={'about-link'} 
                onClick={() => {
                    window.scrollTo({top: -100, behavior: 'smooth'});
                }} 
                > 
                    {'Back'}
            </div>
        </>
    );
};

export default About;