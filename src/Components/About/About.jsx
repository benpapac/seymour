import {useState, useEffect} from 'react';
import useScrollPosition from '../../Hooks/useScrollPosition';
import useTextWheel from '../../Hooks/ScrollingText';
import portrait from '../../Assets/Nicole_Portrait.jpeg'
import './About.css';


const About = () => {

   const textWheel = useTextWheel();
 
    return (
        <section className='about-bg'>

            <img className='about-photo' src={portrait} alt="Nicole in her sitting room" />

            <div className='about-copy-box' >
        <p className='about-blurb' 
            id='one' 
            >
                I was born and raised in Brooklyn, New York, a vibrant, colorful place where there was no shortage of culture, creativity, and characters.  After majoring in Psychology and minoring in Theater at Binghamton University, I decided that connecting with and learning about people was what made me feel most ALIVE. 
                
                <br/>
                <br/>
                
                 I attended Brooklyn College’s School Psychology graduate program and practiced as a psychologist, primarily working with adolescents in the Brooklyn High Schools, for several years.  During this time, I discovered that acting helped me be of better service to others.  
                 
                 <br/>
                 <br/>
                 
                 It was my therapy- I took numerous acting classes and performed regularly with a theater company.  Performing was always about uncovering new layers of myself and about the impact I could have on others. 
        </p>
        <p className='about-blurb'
            id='two' 
            >
            In 2005, my husband and I moved to Los Angeles for what was supposed to be a brief adventure, but we began thriving in our careers and loved the weather, so we decided to stay.  In 2009, I had the idea to combine my passions for creativity and helping others and LG Management was born (coincidentally my daughter was also born that year). 
            
            <br />
            <br />

             LG Management has 2 arms- the first being a talent representation company where I develop and represent artists and the second being a coaching company where I provide individual coaching to people in all fields. 
        </p>
        <p className='about-blurb'
            id='three'
            >
            LG Management has helped shape lives and build careers.  Whether it’s working with actors to cultivate their strengths and tailor their marketing materials or with executives to lead their teams and implement healthier work and lifestyle choices, the goal is always to keep evolving. 
            
            <br/>
            <br/>
            
             With support, patience and intention, I have witnessed clients undergo beautiful transformations in which they feel better about themselves, their relationships and their careers and develop a sense of pride in who they are and what they do.
        </p>
        </div>
            </section>
    );
};

export default About;