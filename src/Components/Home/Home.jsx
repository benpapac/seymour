import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [view, setView] = useState('small');

    const toggleView = () => {
        view === 'small' ? setView('large'): setView('small');
        return view;
    }
    return (
        <section className='landing'>
        <div className='header'>
            <img src="" alt="Nic's Splash photo" className='header-photo' />
            <h1 className='header-title'>
                Meet Nicole.
            </h1>
        </div>

        <div className='left blurb bio'>
            <img src="" alt="Nic's headshot" className='photo' />

            <h4 className='title'>Brooklyn Roots</h4>
            <p className='body'>It all started with a passion that was kindled in the grungy off-Broadway studios of New York City. I grew up in Brooklyn, and New York City will always be my home.{ view==='small' ? <span>..</span> : <span>"Brooklyn," is even my daughter's middle name! But I was drawn like a magnet to Los Angeles, to let my own creative light shine on the sun-dappled coast.
            <br/><br/>
             After a few years, I realized that I wasn't drawn to be in front of the camera. I wasn't drawn to shape stories on a screen. I was drawn to shape lives, with my own two hands. "You have too much love," my father told me once. And he's right! So, I put my extra love into the lives of those who need it. I fulfill my creative calling by helping others fulfill theirs. 
            <br/><br/>
            If this sounds like something you need in your life, <Link to="/contact">Let's talk.</Link>
            </span>}
             <br/>
            <button className='button bio-button' onClick={toggleView}>{view === 'small' ? 'Read more' : 'Read less'}
            </button>
            </p>
        </div>

        <div className='right blurb executives'>
            <h4 className='title' >I got LOTS of Execs.</h4>
            <p className='body'>SAMPLE TEXT: Tall execs, short execs! You want good execs? Great execs? Not, "just okay," execs? This is the place. I even added a fun link you can click to get there faster.
            <br/>
            <Link className='link' to='/executives'><button className='button'>Check 'em out here.</button></Link>
            </p>
        </div>

        <div className='left blurb actors'>
            <h4 className='title' >I got LOTS of actors.</h4>
            <p className='body'>SAMPLE TEXT: Tall actors, short actors! You want good actors? Great actors? Not, "just okay," actors? This is the place. I even added a fun link you can click to get there faster.
            <br/>
            <Link className='link' to='/talent'><button className='button'>Check 'em out here.</button></Link>
            </p>
        </div>

        </section>
    );
};

export default Home;