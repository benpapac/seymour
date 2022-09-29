import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../Util/Context';
import Footer from '../Footer/Footer';
import './Home.css';
import './Home-Phone.css';
import useScroll from '../../Hooks/useScrollPosition';
import logo from '../../Assets/Naomi_Vector.png';

const Home = () => {
    /*
    I'd like to have a scroll-down icon that lets the user know there's more to see. 
        I'd also like that icon to be clickable, so if the user clicks it, they will be scrolled to the next section.
    
    I'd like to add an animation to the Mission Statement, so the portrat
    */

    const scrollData = useScroll();
    const [scroll, setScroll] = useState(110);
    const [oldHeight, setOldHeight] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('neutral');
    const [delay, setDelay] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [count, setCount] = useState(0);
    const [animation, setAnimation] = useState('none');
    const [display, setDisplay] = useState('none');
    const [rects, setRects] = useState({});


    const showScrollDown = () => {
        setTimeout(()=> {
            if(delay < 300) setDelay(delay+1);
            else setOpacity(opacity >= 1? 1: opacity + 0.01)
        }, 10)
    }

    const getDiv = () => {
        let linksBox = document.getElementById('home-links-box') || null;

        let coachingRect = linksBox.getBoundingClientRect();
        return coachingRect;
    }

    useEffect( () => {
        setOldHeight(scrollData.y);
        setRects(getDiv());

        if(scrollData.y > oldHeight) {
            setScrollDirection('down');
        } else if(scrollData.y - oldHeight < 0) {
            setScrollDirection('up');
        } else setScrollDirection('neutral');
         if(rects.y < 200 ) {
            setAnimation('home-slide-up 2s');
            setDisplay('flex');
            setCount(0);
        } 
        showScrollDown();
    }, [scrollData.y, opacity])


    return (
        <section className='home-bg'>
            <div className='home-box' id='home-mission-box'>
                <img src="https://i.imgur.com/scUZ8l7.jpg" 
                    alt="Nic's headshot" 
                    className='home-photo'
                    />
                    <p id='home-mission-copy'>LG Management serves to amplify people’s creativity, resourcefulness, and value by helping to shape not only what they want to do in the world but how they want to exist in it.
                    <br/>
                    <br/>
                <Link to='/about' style={{textDecoration: 'none'}}><span className='homePage-link' id='about'>Meet Nicole.</span></Link>
                </p>
            </div>

            <section className='home-box' id='home-links-box' >
                <div className='home-filter' />
                    <div id='home-talent-box' style={{display: `${display}`, animation: `${animation}`,}}>
                        <p id="home-talent-copy"><span className='headline'>Artists</span>
                        <br/> Nicole's clients grace the screen for CBS, Netflix, and NBC.
                        <Link to="/talent" style={{textDecoration: 'none'}}>
                        <br/>
                        <span className='homePage-link' id='home-talent-link'>
                            Meet the artists.</span></Link>
                        </p>
                    </div>
                    
                    <div id='home-coaching-box' style={{display: `${display}`, animation: `${animation}`,}}>
                    <p id='home-coaching-copy'><span className='headline'>Coaching</span>
                        <br /> Nicole offers one-on-one services to executives and entrepreneurs in all fields.
                    <Link to='/coaching' style={{textDecoration: 'none'}}>
                        <br/>
                        <span className='homePage-link' id='home-coaching-link'>Learn about coaching.</span></Link>  
                    </p>
                    </div>
                    
            </section>

                    {window.innerWidth < 1100 ? null : <Footer />}
        </section>
    );
};

export default Home;