import {useState, useReducer, useEffect} from 'react';
import useScrollPosition from '../../Hooks/useScrollPosition';
import useTextWheel from '../../Hooks/ScrollingText';
import portrait from '../../Assets/Nicole_Portrait.jpeg'
import './About.css';
import aboutMe from '../../Json/aboutMe.json';


const About = () => {

    const scrollData = useScrollPosition();
   const grafs = aboutMe[0].grafs;
   const [oldScrollHeight, setOldScrollHeight] = useState(0);
   const [activeGraf, setActiveGraf] = useState(0);

   const grafStylesReducer = (state, action) => {
       switch(action.type){

           case 'newIdx':
                let idx = action.idx;
               return {
                   ...state,
                   [idx]: action.value,
               }

            case 'scroll':
                let prevValue = action.value.prev;
                let nextValue = action.value.next;
                let prevIdx = action.indeces.prev;
                let nextIdx = action.indeces.next;

                return {
                    ...state,
                    [prevIdx]: {
                        opacity: prevValue.opacity, 
                        top: prevValue.top
                        },

                        [nextIdx]: {
                        opacity: nextValue.opacity, 
                        top: nextValue.top,
                        }
                }
               default: break;
       }
   }
   const [grafStyles, grafStylesDispatch] = useReducer(grafStylesReducer, []);

   const createGrafStyles = () => {
      grafs.map((graf, idx)=> {
         let o = idx === 0 ? 1 : 0;
        grafStylesDispatch({type: 'newIdx', idx: idx, value: {opacity: o, top: 30}});
    });
   }

   const updateActiveGraf = (scrollDirection) => {
       if(scrollDirection > 0) {
           if( (grafStyles[activeGraf].opacity === 0) && (activeGraf < grafs.length-1) ) {
               setActiveGraf( activeGraf+1 );
            }
        } else if( scrollDirection < 0) {
            if (grafStyles[activeGraf].opacity === 0 && (activeGraf > 0) ) {
                setActiveGraf( activeGraf-1 );
            }
        }    
        else return;
    }

   const updateValues = (prev, next, direction) => {
       let prevValue = {...prev};
       let nextValue = {...next};

       if(direction === 'up'){
           console.log('scrolling up...')
            prevValue ={opacity: prev.opacity <= 0 ? 0 : prev.opacity - 0.1, top: prev.top >= 100 ? 100 : prev.top +1};
            if(prev.top >= 100 && prev.opacity <= 0) {
                nextValue = {opacity: next.opacity >= 1 ? 1 : next.opacity + 0.1, top: next.top >= 30? 30 : next.top +1};
            }
        } else {
           console.log('scrolling down...')
             prevValue ={opacity: prev.opacity <= 0 ? 0 : prev.opacity - 0.1, top: prev.top <= -30 ? -30 : prev.top -1};
             if(prev.top <= -30 && prev.opacity <= 0) {
                 nextValue = {opacity: next.opacity >= 1 ? 1 : next.opacity + 0.1, top: next.top <= 30? 30 : next.top -1};
             }
        }
        return {prev: prevValue, next: nextValue};
   }

   const scroll = (prev, next, direction) => {
       let values = updateValues(prev, next, direction);

       if( direction === 'down' ) {
               grafStylesDispatch({
                type: 'scroll', 
                indeces: {prev: activeGraf, next: activeGraf+1 },
                value: {prev: values.prev, next: values.next } 
            });
        } else  if( direction === 'up' ) {
            grafStylesDispatch({
               type: 'scroll', 
                indeces: {prev: activeGraf, next: activeGraf-1 },
               value: {prev: values.prev, next: values.next }
              });
            }
   }

   const scrollThroughText = (scrollDirection) => {
        let prev = grafStyles[activeGraf];
        updateActiveGraf(scrollDirection);
        
        if(scrollDirection > 0 && activeGraf <= grafs.length -2) {
           let next = grafStyles[activeGraf+1];
          setTimeout(scroll(prev, next, 'down'), 10);
       }
       else if (scrollDirection < 0 && activeGraf > 0 ) {
           let next = grafStyles[activeGraf-1];
            setTimeout(scroll(prev, next, 'up'), 10);
       };
   }

   useEffect( ()=> {
       if(!grafStyles[0])createGrafStyles();
       else {
           setOldScrollHeight(scrollData.y);
           let scrollDirection = scrollData.y - oldScrollHeight;
           //    console.log(scrollDirection > 0 ? 'scrolling down...' : 'scrolling up...')
           scrollThroughText(scrollDirection);
        }
   }, [scrollData.y, ]);
 
    return (
        <section className='about-bg'>

            <img className='about-photo' src={portrait} alt="Nicole in her sitting room" />

            <div className='about-copy-box' >
                { (grafStyles[0]) 
                    ? ( grafs.map((graf, idx) => {
                            return  <p className='about-blurb' style={{
                                // opacity: `${grafStyles[idx].opacity}`, 
                                // top: `${grafStyles[idx].top}vh`
                            }}>
                                {graf}
                            </p>
                        }
                    )) 
                    : null
                }
        {/* <p className='about-blurb' 
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
        </p> */}
        </div>
            </section>
    );
};

export default About;