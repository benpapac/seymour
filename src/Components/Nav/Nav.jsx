import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../Assets/Naomi_Vector.png';
import './Nav.css';
const Nav = () => {
    const activeStyle = {color: 'white'}
    return (
      <nav className='Nav'>
        <NavLink  className="link home-link" to='/' >
          <img className='home-link' src={logo} alt="LG Management" />
        </NavLink>
        <NavLink className="link" to='/about'  style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          <h4>About</h4>
        </NavLink>
        <NavLink className="link" to='/talent' style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          <h4>Talent</h4>
        </NavLink>
        <NavLink className="link" to='/coaching' style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          <h4>Coaching</h4>
        </NavLink>
        <NavLink className="link" to='/blog' style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          <h4>Blog</h4>
        </NavLink>
        <NavLink  className="link" to='/contact' style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          <h4>Contact</h4>
        </NavLink>
      </nav>
    );
};

export default Nav;