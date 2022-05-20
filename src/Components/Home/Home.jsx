import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../Util/Context';
import './Home.css';
import useScroll from '../../Hooks/useScrollPosition';

const Home = () => {
    /*
    I'd like to have a splash photo that takes up the majority of the page at first. Then, as the user scrolls, the splash photo decreases in size. SPINOZA is a good example.
    */

    const scrollData = useScroll();
    const [scroll, setScroll] = useState(110);
    const [oldHeight, setOldHeight] = useState(0);
    const [ready, setReady] = useState(false );
    const [opacity, setOpacity] = useState(1.0);

    const updateScrolls = (yDiff) => {

        if(yDiff > 0) {
            setScroll(scroll === 60 ? 60 : scroll - 1);
        }
        else setScroll(scroll === 110 ? 110 : scroll + 2);
    }

    useEffect( () => {
        setOldHeight(scrollData.y);
        let yDiff = scrollData.y-oldHeight;
        updateScrolls(yDiff);

        // if(!ready)setTimeout( ()=> {
        //     setReady(true);
        // }, 3000)

        // else setTimeout(()=> {
        //     setOpacity(opacity === 1? 1: opacity + 0.01)
        // }, 10)

    }, [scrollData.y, opacity, ready])


    return (
        <section className='home-bg'>
            {/* <img className='home-photo' src="https://i.imgur.com/jRinQU3.jpg?1" alt="Nicole and her dog Seymour" /> */}
            <div className='home-photo-box'>
                <img src="https://i.imgur.com/scUZ8l7.jpg" alt="Nic's headshot" className='home-photo' />
                <Link to='/about' style={{textDecoration: 'none'}}><p className='homePage-link' id='about'>Meet Nicole.</p></Link>
            </div>
            { scroll > 80? <img  id='scroll-down' 
                                src="https://i.imgur.com/aavGSjK.jpg" 
                                alt="scroll down"
                                style={{opacity: `${opacity}`}} /> : null}
            {/* <div className='home-background'/> */}

                <h4 className="home-headline" style={{top: `15vh`}}>Welcome to LG Management</h4>
            <p id='home-mission'>LG Management serves to amplify people’s creativity, resourcefulness, and value by helping to shape not only what they want to do in the world but how they want to exist in the world</p>
                    <div className='home-talent-box' style={{top: `${scroll}vh`}}>
                    <p id="home-talent-copy"><span>Artists</span>
                    <br/> Nicole's clients grace the screen for CBS, Netflix, and NBC.
                    </p>
                    <Link to="/talent" style={{textDecoration: 'none'}}><h6 className='homePage-link' id='home-talent-link'>Meet the artists.</h6></Link>
                    </div>
                
                    <div className='home-coaching-box' style={{top: `${scroll}vh`}}>
                    <p id='home-coaching-copy'><span>Coaching</span>
                        <br /> Nicole offers one-on-one services to executives and entrepreneurs in all fields.
                    </p>
                    <Link to='/coaching' style={{textDecoration: 'none'}}><h6 className='homePage-link' id='home-coaching-link'>Learn about coaching.</h6></Link>   
                    </div>

                    {/* <p id='home-contact-copy'>If you'd like to speak with Nicole, <span className='homePage-link'> <Link to="/contact" style={{textDecoration: 'none'}}>Reach out.</Link></span>
                    </p> */}
        </section>
    );
};

export default Home;