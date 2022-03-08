import React from 'react';
import {Link} from 'react-router-dom';

import './Nav.css';
const Nav = () => {
    return (
        <nav className='Nav'>
            <Link  className="link" to='/'>
                <div className="nav-link link-logo"></div>
                <h4>LG Logo</h4>
            </Link>
            {/* <Link  className="link" to='/test'>
                <div className="link-test"></div>
                <h4>Test</h4>
            </Link> */}
            <Link  className="link" to='/contact'>
                <div className="nav-link link-contact"></div>
                <h4>Contact</h4>
            </Link>
            <Link className="link" to='/talent'>
                <div className="nav-link link-talent"></div>
                <h4>Talent</h4>
            </Link>
            <Link className="link" to='/executives'>
                <div className="nav-link link-executives"></div>
                <h4>Executives</h4>
            </Link>
        </nav>
    );
};

export default Nav;