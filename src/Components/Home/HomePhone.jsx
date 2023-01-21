import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home-Phone.css'

const HomePhone = () => {
    const LIGHTBULBS = `url(${process.env.REACT_APP_AWS}AdobeStock_LightBulbs.jpg)`

    useEffect(()=>{
        window.scroll(0,0);
    },[]);
    return (
        <>
         <div className='home-box' id='home-mission-box'>
            <div id='home-mission-filter'>

                <p id='home-mission-copy'>LG Management serves to amplify people’s creativity, resourcefulness, and value by helping to shape not only what they want to do in the world but how they want to exist in it.
                </p>
                <Link to='/about'  style={{textDecoration: 'none'}}>
                    <span id='about'>Meet Nicole.</span>
                </Link>
            </div>
            </div>
             <section className='home-box' id='home-links-box' >
                <div className='home-filter' />
                    <div id='home-talent-box' >
                        <p id="home-talent-copy"><span className='headline'>Artists</span>
                        <br/> Nicole's clients grace the screen for CBS, Netflix, and NBC.
                        <Link to="/talent" style={{textDecoration: 'none'}}>
                        <br/>
                        <span className='homePage-link' id='home-talent-link'>
                            Meet the artists.</span></Link>
                        </p>
                    </div>
                    
                    <div id='home-coaching-box' >
                    <p id='home-coaching-copy'><span className='headline'>Coaching</span>
                        <br /> Nicole offers one-on-one services to executives and entrepreneurs in all fields.
                    <Link to='/coaching' style={{textDecoration: 'none'}}>
                        <br/>
                        <span className='homePage-link' id='home-coaching-link'>Learn about coaching.</span></Link>  
                    </p>
                    </div>
                    
            </section>
        </>
    );
};

export default HomePhone;