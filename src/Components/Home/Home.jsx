import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {

    return (
        <section className='landing'>
        <div className='left blurb bio'>
            <img src="" alt="Nic's headshot" className='photo' />

            <h4 className='title'>Meet Nicole.</h4>
            <p className='body'>I was born and raised in Brooklyn, New York, a vibrant, colorful place where there was no shortage of culture, creativity, and characters.  After majoring in Psychology and minoring in Theater at Binghamton University, I decided that connecting with and learning about people was what made me feel most ALIVE.  I attended Brooklyn College’s School Psychology graduate program and practiced as a psychologist, primarily working with adolescents in the Brooklyn High Schools, for several years.  During this time, I discovered that acting helped me be of better service to others.  It was my therapy- I took numerous acting classes and performed regularly with a theater company.  Performing was always about uncovering new layers of myself and about the impact I could have on others.
            <br></br>
            <br></br>
            In 2005, my husband and I moved to Los Angeles for what was supposed to be a brief adventure, but we started thriving in our careers and loved the weather, so we decided to stay.  In 2009, I had the idea to combine my passions for creativity and helping others and LG Management was born (coincidentally my daughter was also born that year).  LG Management has 2 arms: the first is a talent representation company where I develop and represent artists, and the second is a coaching company where I provide individual coaching to people in all fields.  
            <br></br>
            <br></br>
            Through the The International Federation of Coaches, I became a Professional Certified Coach.  Coaching feeds my soul.  When people ask me to explain coaching, I tell them it’s like seeing someone who is trapped in a room discover different ways to get out- they open doors they knew were there but were afraid to open, and discover doors they never knew existed.  It’s a collaborative and transformational process that involves broadening perspectives, sitting in both familiar and unfamiliar feelings and exploring possibilities.   
            </p>
            <Link to="/contact">Let's talk.</Link>
        </div>
        </section>
    );
};

export default Home;