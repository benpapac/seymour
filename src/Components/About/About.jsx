import {useState, useEffect} from 'react';
import useScrollPosition from '../../Hooks/useScrollPosition';
import { Link } from 'react-router-dom';
import './About.css';


const About = () => {
    /*
    I'd love to create a Wheeling effect. As the user scrolls, each new paragraph wheels into view, increasing in scale, before wheeling away, while getting smaller. The effect works in both scroll directions.
    */

    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

	const handleScroll = (e) => {
        console.log('were scrolling');
        console.log('scroll: ', scrollPosition);
		setScrollPosition({ x: e.path[1].scrollX, y: e.path[1].scrollY });
	};

    const checkScroll = () => {
        let scaleNum = 0;
        if(scrollPosition.y < 750) {
            scaleNum+= scrollPosition * 0.1;
        }

        scaleNum = 100 - scaleNum;

        return {transform: `scale(${scaleNum})`};
    }

    useEffect(() => {
        // document.addEventListener('onScroll', handleScroll);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('onScroll', handleScroll);
            // document.removeEventListener('onScroll', handleScroll);
		}
	}, [scrollPosition.y]);

    return (
        <>
            <img className='about-photo' src="https://i.imgur.com/dqYKOPv.jpg?2" alt="Nicole and her dog Seymour" />
            <div className='about-background'/>
            <div className='about-background-two'/>


            <p className='about-blurb top'>
                I was born and raised in Brooklyn, New York, a vibrant, colorful place where there was no shortage of culture, creativity, and characters.  After majoring in Psychology and minoring in Theater at Binghamton University, I decided that connecting with and learning about people was what made me feel most ALIVE.
            </p>
            <br/>
            <br/>
            <br/>
            <p className='about-blurb middle'>
                I attended Brooklyn College’s School Psychology graduate program and practiced as a psychologist, primarily working with adolescents in the Brooklyn High Schools, for several years.  During this time, I discovered that acting helped me be of better service to others.  It was my therapy- I took numerous acting classes and performed regularly with a theater company.  Performing was always about uncovering new layers of myself and about the impact I could have on others.
           </p>
           <br/>
            <br/>
            <br/>
           <p className='about-blurb bottom'>
            In 2005, my husband and I moved to Los Angeles for what was supposed to be a brief adventure, but we started thriving in our careers and loved the weather, so we decided to stay.  In 2009, I had the idea to combine my passions for creativity and helping others and LG Management was born (coincidentally my daughter was also born that year). 
            </p>
            <br/>
            <br/>
            <br/>
        </>
    );
};

export default About;