import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import './Home-Phone.css';

import useIntersectionObserver from '../../Hooks/useIntersectionObserver';

const Home = () => {
    const LIGHTBULBS = `url(${process.env.REACT_APP_AWS}AdobeStock_LightBulbs.jpg)`
    const [linksStyle, setLinksStyle] = useState({
        display: 'none',
        animation: 'none',
    });
    const [ref, entry] = useIntersectionObserver({
        threshold: Array.from( Array(100), (_,idx) => idx*0.01+.01)
    });

    useEffect( () => {
        if(entry.intersectionRatio > 0.5){
            setLinksStyle({
                display: 'block',
                animation: 'home-slide-up 2s'
            })
        }
        
    }, [entry.intersectionRatio])

    return (
        <section className='home-bg'>
            <div className='home-box' id='home-mission-box'
                style={ window.innerWidth < 1101 ? {
                    backgroundImage: `url(${process.env.REACT_APP_AWS}Nicole_Portrait.jpg)`,
                    margintTop: '10vh',
                } : null}
                >
               {window.innerWidth >1100 ? <img src={process.env.REACT_APP_AWS+"Nicole_Portrait.jpg"}
                    alt="Nic's headshot" 
                    className='home-photo'
                    /> : null}
                    <p id='home-mission-copy'>LG Management serves to amplify people’s creativity, resourcefulness, and value by helping to shape not only what they want to do in the world but how they want to exist in it.
                    <br/>
                    <br/>
                <Link to='/about' style={{textDecoration: 'none'}}><span className='homePage-link' id='about'>Meet Nicole.</span></Link>
                </p>
            </div>

            <section className='home-box' id='home-links-box'
                ref={ref}
            style={{backgroundImage: LIGHTBULBS}} >
                <div className='home-filter' />
                    <div id='home-talent-box' style={linksStyle}>
                        <p id="home-talent-copy"><span className='headline'>Artists</span>
                        <br/> Nicole's clients grace the screen for CBS, Netflix, and NBC.
                        <Link to="/talent" style={{textDecoration: 'none'}}>
                        <br/>
                        <span className='homePage-link' id='home-talent-link'>
                            Meet the artists.</span></Link>
                        </p>
                    </div>
                    
                    <div id='home-coaching-box' style={linksStyle}>
                    <p id='home-coaching-copy'><span className='headline'>Coaching</span>
                        <br /> Nicole offers one-on-one services to executives and entrepreneurs in all fields.
                    <Link to='/coaching' style={{textDecoration: 'none'}}>
                        <br/>
                        <span className='homePage-link' id='home-coaching-link'>Learn about coaching.</span></Link>  
                    </p>
                    </div>
                    
            </section>
        </section>
    );
};

export default Home;