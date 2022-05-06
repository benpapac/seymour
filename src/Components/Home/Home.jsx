import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../Util/Context';
import './Home.css';

const Home = () => {
    /*
    I'd like to have a splash photo that takes up the majority of the page at first. Then, as the user scrolls, the splash photo decreases in size. SPINOZA is a good example.
    */

    const context = useContext(Context);
    const [currentFocus, setCUrrentFocus] = useState(0);

    const focusPoints = context.focusPoints;



    return (
        <>
            {/* <img className='home-photo' src="https://i.imgur.com/jRinQU3.jpg?1" alt="Nicole and her dog Seymour" /> */}
            <div className='home-photo-box'>
                <img src="https://i.imgur.com/scUZ8l7.jpg" alt="Nic's headshot" className='home-photo' />
                <Link to='/about' style={{textDecoration: 'none'}}><p className='homePage-link' id='about'>Meet Nicole.</p></Link>
            </div>
            <div className='home-background'/>

                <h4 className="home-headline">Welcome to LG Management</h4>
                    <div className='home-copy-box'>
                    <p id="home-talent-copy"><span>Artists</span>
                    <br/> Nicole's clients grace the screen for CBS, Netflix, and NBC.
                    </p>
                    </div>
                    <Link to="/talent" style={{textDecoration: 'none'}}><h6 className='homePage-link' id='home-talent-link'>Meet the artists.</h6></Link>
                
                    <div className='home-copy-box'>
                    <p id='home-coaching-copy'><span>Coaching</span>
                        <br /> Nicole offers one-on-one services to executives and entrepreneurs in all fields.
                    </p>
                    </div>
                    <Link to='/coaching' style={{textDecoration: 'none'}}><h6 className='homePage-link' id='home-coaching-link'>Learn about coaching.</h6></Link>   

                    {/* <p id='home-contact-copy'>If you'd like to speak with Nicole, <span className='homePage-link'> <Link to="/contact" style={{textDecoration: 'none'}}>Reach out.</Link></span>
                    </p> */}
        </>
    );
};

export default Home;