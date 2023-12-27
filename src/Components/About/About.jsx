import {useState, useReducer, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import portrait from '../../Assets/Nicole_Portrait.jpeg'
import './About.css';
import './PhoneAbout.css';
import aboutMe from '../../Json/aboutMe.json';
import BackButton from '../Back/BackButton';


const About = () => {
   const grafs = aboutMe[0].grafs;
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

            <BackButton/>
        </>
    );
};

export default About;