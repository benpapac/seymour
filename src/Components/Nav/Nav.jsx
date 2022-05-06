import React from 'react';
import {Link} from 'react-router-dom';

import './Nav.css';
const Nav = () => {
    return (
        <nav className='Nav'>
            <Link  className="link" to='/'>
                    <img className='link home-link' src="https://i.imgur.com/dhAuOr0.jpg" alt="LG Management" />
            </Link>
            <Link  className="link" to='/contact'>
                <h4>Contact</h4>
            </Link>
            <Link className="link" to='/talent'>
                <h4>Talent</h4>
            </Link>
            <Link className="link" to='/coaching'>
                <h4>Coaching</h4>
            </Link>
            <Link className="link" to='/about'>
                <h4>About</h4>
            </Link>
        </nav>
    );
};

export default Nav;