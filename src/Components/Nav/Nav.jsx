import React from 'react';
import {Link} from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Executives from '../Executives/Executives';
import Talent from '../Talent/Talent';
import Consultation from '../Consultation/Consultation';
import './Nav.css';
const Nav = () => {
    return (
        <nav className='Nav'>
            <Link  to='/' > LG Logo </Link>
            <Link  to='/about' > About </Link>
            <Link  to='/contact' > Contact </Link>
            <Link  to='/talent' > Talent </Link>
            <Link  to='/executives' > Executives </Link>
            <Link  to='/consultation' > Consultation </Link>
           
            
        </nav>
    );
};

export default Nav;