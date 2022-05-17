import {useState, useEffect} from 'react';
import useScrollPosition from '../../Hooks/useScrollPosition';
import useTextWheel from '../../Hooks/ScrollingText';
import { Link } from 'react-router-dom';
import './About.css';


const About = () => {
    /*
    I'd love to create a Wheeling effect. As the user scrolls, each new paragraph wheels into view, increasing in scale, before wheeling away, while getting smaller. The effect works in both scroll directions.
    */
   const textWheel = useTextWheel();
    const scrollPosition = useScrollPosition();
    const [oldY, setOldY] = useState(0);
    const [slide, setSlide] = useState('slideOne');
    const [sign, setSign] = useState('-');
    const [slides, setSlides] = useState({
        slideOne: {
            x: 150,
            y: 0,
        }, 
        slideTwo: {
            x: 150,
            y: 0,
        }, 
        slideThree: {
            x: 150,
            y: 0,
        }, 
    })

    const slideIn = () => {
        if( slides[slide].x === 0){
            console.log(slide)
            setSlides({
                ...slides,
                [slide]: {
                    ...slides[slide],
                    y: slide === 'slideThree' ? 0 : (slides[slide].y === 150 ? 150 : slides[slide].y+1.5)
                }
            })
        }
        else setSlides({
            ...slides,
            [slide]: {
                x: slides[slide].x === 0 ? 0 : slides[slide].x -1,
                y: slides[slide].y
            }
        });
    }

    const slideOut = () => {
        if(sign === '+') {
            setSlides({
            ...slides,
            [slide]: {
                ...slides[slide],
                y: slides[slide].y+1.5
                }
        })
    }
     else setSlides({
            ...slides,
            [slide]: {
                ...slides[slide],
                y: slides[slide].y-1.5
                }
        })
    };

    const updateSlide= (scrollingDown) => {
        if(scrollingDown){
            setSign('-');
            slideIn();
         } else {
            if(slides[slide].y === 0){
            setSign('+');
            };
             slideOut();
         }
        }

    const handleSlides = (scrollingDown) => {
        if(slides.slideOne.y !== 150 ) {
            setSlide('slideOne');
            updateSlide(scrollingDown);
        }
        else if(slides.slideTwo.y !== 150) {
           setSlide('slideTwo')
            updateSlide(scrollingDown);
        }
        else {
            setSlide('slideThree')
            updateSlide(scrollingDown);
        };
    };

    useEffect(() => {
        // setOldY(scrollPosition.y);
        // let scrollingDown = (scrollPosition.y - oldY) > 0;
        // handleSlides(scrollingDown);
    }, [scrollPosition.y]);


    return (
        <section style={{height: `7000vh`, width: `100vw`}}>
            <img className='about-photo' src="https://i.imgur.com/XNcUYAs.jpg" alt="Nicole in her sitting room" />
            <div className='about-background'/>
            <div className='about-background-two'/>

            <div className='about-text-wheel' style={{ transform: `rotate(${textWheel.angle}deg)`}} >
        <p className='about-blurb' 
            id='one' 
            style={{
                opacity: `${textWheel.opacity[textWheel.angles[0]]}`,
                transform:  `rotate(${textWheel.angles[0]}deg)`,         
            }}>
            I was born and raised in Brooklyn, New York, a vibrant, colorful place where there was no shortage of culture, creativity, and characters.  After majoring in Psychology and minoring in Theater at Binghamton University, I decided that connecting with and learning about people was what made me feel most ALIVE.
        </p>
        <p className='about-blurb'
            id='two' 
            style={{
                opacity: `${textWheel.opacity[textWheel.angles[1]]}`,
                transform:  `rotate(-${textWheel.angles[1]}deg)`, 
                }}>
            I attended Brooklyn College’s School Psychology graduate program and practiced as a psychologist, primarily working with adolescents in the Brooklyn High Schools, for several years.  During this time, I discovered that acting helped me be of better service to others.  It was my therapy- I took numerous acting classes and performed regularly with a theater company.  Performing was always about uncovering new layers of myself and about the impact I could have on others.
        </p>
        <p className='about-blurb'
            id='three'
            style={{
                opacity: `${textWheel.opacity[textWheel.angles[2]]}`,
                transform: `rotate(-${textWheel.angles[2]}deg)`,
            }}>
            In 2005, my husband and I moved to Los Angeles for what was supposed to be a brief adventure, but we started thriving in our careers and loved the weather, so we decided to stay.  In 2009, I had the idea to combine my passions for creativity and helping others and LG Management was born (coincidentally my daughter was also born that year
        </p>
        </div>

           {/* <p className='about-blurb top' style={{
                transform: `translate(${slides.slideOne.x}%, 
                            ${sign}${slides.slideOne.y}%)`
                }}>
                I was born and raised in Brooklyn, New York, a vibrant, colorful place where there was no shortage of culture, creativity, and characters.  After majoring in Psychology and minoring in Theater at Binghamton University, I decided that connecting with and learning about people was what made me feel most ALIVE.
            </p>
            <br/>
            <br/>
            <br/>
             <p className='about-blurb middle' style={{
                 transform: `translate(${slides.slideTwo.x}%, 
                            ${sign}${slides.slideTwo.y}%)`,
                }}>
                I attended Brooklyn College’s School Psychology graduate program and practiced as a psychologist, primarily working with adolescents in the Brooklyn High Schools, for several years.  During this time, I discovered that acting helped me be of better service to others.  It was my therapy- I took numerous acting classes and performed regularly with a theater company.  Performing was always about uncovering new layers of myself and about the impact I could have on others.
           </p>
           <br/>
            <br/>
            <br/>
           <p className='about-blurb bottom' style={{
               transform: `translate(${slides.slideThree.x}%, 
                            ${sign}${slides.slideThree.y}%)`,
               }}>
            In 2005, my husband and I moved to Los Angeles for what was supposed to be a brief adventure, but we started thriving in our careers and loved the weather, so we decided to stay.  In 2009, I had the idea to combine my passions for creativity and helping others and LG Management was born (coincidentally my daughter was also born that year). 
            </p>
            <br/>
            <br/>
            <br/> */}
        </section>
    );
};

export default About;