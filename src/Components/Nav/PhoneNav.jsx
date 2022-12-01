import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/Naomi_Logo.png';
import './PhoneNav.css';



const PhoneNav = () => {
    const activeStyle = {color: '#c9a227'}

    const [navId, setNavId] = useState('hidden');
    const [navButtonId, setNavButtonId] = useState('hamburger');
    const [navButtonAnimation, setNavButtonAnimation] = useState('');
	const toggleNav = (e) => {
		e.preventDefault();
    setTimeout(() => {
      setNavButtonAnimation('appear 3s');
      setNavButtonId( navButtonId === 'exit' ? 'hamburger' : 'exit');
    }, 800) ;
    setNavButtonAnimation( 'rollout 1.5s' );
    setNavId( navId === 'visible' ? 'hidden' : 'visible');
	}

    return (
        <>
        <div>
        <NavLink className='link home-link' to='/'>
							<img className='home-link' src={logo} alt='LG Management' />
						</NavLink>
            <button id={navButtonId} onClick={toggleNav} style={{animation: navButtonAnimation}}></button>
        </div>
            <div className='nav-screen'  onClick={toggleNav} id={navId}  >
                  <NavLink  className="phone-link" to='/' style={({ isActive }) =>
              isActive ? activeStyle : undefined }>
                        <h4>Home</h4>
                </NavLink>
                <NavLink className="phone-link" to='/about'  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
                    <h4>About</h4>
                </NavLink>
                <NavLink className="phone-link" to='/talent' style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
                    <h4>Talent</h4>
                </NavLink>
                <NavLink className="phone-link" to='/coaching' style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
                    <h4>Coaching</h4>
                </NavLink>
                <NavLink  className="phone-link" to='/contact' style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
                    <h4>Contact</h4>
                </NavLink>
            </div>
        </>
    );
};

export default PhoneNav;