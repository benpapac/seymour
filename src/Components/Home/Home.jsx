import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../Util/Context';
import './Home.css';
import useScroll from '../../Hooks/useScrollPosition';
import logo from '../../Assets/Naomi_Vector.png';

const Home = () => {
    /*
    I'd like to have a splash photo that takes up the majority of the page at first. Then, as the user scrolls, the splash photo decreases in size. SPINOZA is a good example.
    */

    const scrollData = useScroll();
    const [scroll, setScroll] = useState(110);
    const [oldHeight, setOldHeight] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('neutral');
    const [delay, setDelay] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [photoScale, setPhotoScale] = useState(85);
    const [animation, setAnimation] = useState('none');


    const updateScrolls = (yDiff) => {
        if(scrollDirection === 'down') {
            setTimeout(()=>{
                setScroll(scroll <= 60 ? 60 : scroll - 1);
                setPhotoScale(photoScale <= 50 ? 50 : photoScale - 0.33);
            }, 10)
        }
        else setTimeout(()=>{
            setScroll(scroll >= 110 ? 110 : scroll + 2);
                setPhotoScale(photoScale >= 85 ? 85 : photoScale + 0.33);
            }, 10)
    }

    const showScrollDown = () => {
        setTimeout(()=> {
            if(delay < 300) setDelay(delay+1);
            else setOpacity(opacity >= 1? 1: opacity + 0.01)
        }, 10)
    }

    const updateAnimations = () => {
        if(scroll <= 100) setAnimation('home-slide-down 3s');
    }

    useEffect( () => {
        setOldHeight(scrollData.y);
        let yDiff = scrollData.y-oldHeight;
        let scrollDirection = 'neutral';
        if(yDiff > 0) {
            setScrollDirection('down');
        } else if(yDiff < 0) {
            setScrollDirection('up');
        }

        showScrollDown();
        updateScrolls(scrollDirection);
        updateAnimations();

    }, [scrollData.y, opacity, photoScale, delay])


    return (
        <section className='home-bg'>
            <div className='home-box' id='home-headline-box'>
                <img className='home-headline' src={logo} style={{width:' 40vw', marginTop: '20vh'}}/>
            </div>


            <div className='home-box' id='home-mission-box'>
                <img src="https://i.imgur.com/scUZ8l7.jpg" 
                    alt="Nic's headshot" 
                    className='home-photo'
                    // style={{height: `${photoScale}vh`}} /> 
                    />
                    <p id='home-mission-copy'>LG Management serves to amplify people’s creativity, resourcefulness, and value by helping to shape not only what they want to do in the world but how they want to exist in the world
                    <br/>
                    <br/>
                <Link to='/about' style={{textDecoration: 'none'}}><span className='homePage-link' id='about'>Meet Nicole.</span></Link>
                </p>
            </div>

            <section className='home-box' id='home-links-box' >
                <div className='home-filter' />

                    <div id='home-talent-box'>
                        <p id="home-talent-copy"><span>Artists</span>
                        <br/> Nicole's clients grace the screen for CBS, Netflix, and NBC.
                        <Link to="/talent" style={{textDecoration: 'none', animation: `${animation}`, display: `${scroll} === 60 ? none : block`}}><h6 className='homePage-link' id='home-talent-link'>Meet the artists.</h6></Link>
                        </p>
                    </div>
                    
                    <div id='home-coaching-box'>
                    <p id='home-coaching-copy'><span>Coaching</span>
                        <br /> Nicole offers one-on-one services to executives and entrepreneurs in all fields.
                    <Link to='/coaching' style={{textDecoration: 'none', animation: `${animation}`, display: `${scroll} === 60 ? none : block`}}><h6 className='homePage-link' id='home-coaching-link'>Learn about coaching.</h6></Link>  
                    </p>
                    </div>
                    
            </section>

                    {/* <p id='home-contact-copy'>If you'd like to speak with Nicole, <span className='homePage-link'> <Link to="/contact" style={{textDecoration: 'none'}}>Reach out.</Link></span>
                    </p> */}
        </section>
    );
};

export default Home;