import {useState, useReducer, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import useScrollPosition from '../../Hooks/useScrollPosition';
import portrait from '../../Assets/Nicole_Portrait.jpeg'
import './About.css';
import './PhoneAbout.css';
import aboutMe from '../../Json/aboutMe.json';


const About = () => {
   const grafs = aboutMe[0].grafs;
 
    return (
        <section className='about-bg'>

            <img className='about-photo' src={portrait} alt="Nicole in her sitting room" />

            <div className='about-copy-box' >
                {  grafs.map((graf, idx) => {
                            return  <p className='about-blurb'>
                                {graf}
                                <br/>
                                <NavLink to='/' className='about-link' > <span style={{textDecoration: 'none'}}>Back</span></NavLink>
                            </p>
                        }
                    )
                }
        </div>
            </section>
    );
};

export default About;