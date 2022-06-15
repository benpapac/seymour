import {useState, useReducer, useEffect} from 'react';
import useScrollPosition from '../../Hooks/useScrollPosition';
import useTextWheel from '../../Hooks/ScrollingText';
import portrait from '../../Assets/Nicole_Portrait.jpeg'
import './About.css';
import './About-phone.css';
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
        </div>
            </section>
    );
};

export default About;