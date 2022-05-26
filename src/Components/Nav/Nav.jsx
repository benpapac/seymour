import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../Assets/Naomi_Vector.png'


import './Nav.css';
const Nav = () => {
    return (
        <>
        {window.innerWidth >= 1100 ?( 
            <>
             <div className='nav-filter'/>

            <nav className='Nav'>
                <Link  className="link" to='/'>
                        <img className='link home-link' src={logo} alt="LG Management" />
                </Link>
                <Link className="link" to='/about'>
                    <h4>About</h4>
                </Link>
                <Link className="link" to='/talent'>
                    <h4>Talent</h4>
                </Link>
                <Link className="link" to='/coaching'>
                    <h4>Coaching</h4>
                </Link>
                <Link  className="link" to='/contact'>
                    <h4>Contact</h4>
                </Link>
            </nav>
            </>
        )
        : null}
        </>
    );
};

export default Nav;