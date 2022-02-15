import React from 'react';
import {Link} from 'react-router-dom';

import './Nav.css';
const Nav = () => {
    return (
        <nav className='Nav'>
            <Link  to='/' > LG Logo </Link>
            <Link  to='/test' > Test </Link>

            <Link  to='/about' > About </Link>
            <Link  to='/contact' > Contact </Link>
            <Link  to='/talent' > Talent </Link>
            <Link  to='/executives' > Executives </Link>
            <Link  to='/consultation' > Consultation </Link>
           
            
        </nav>
    );
};

export default Nav;