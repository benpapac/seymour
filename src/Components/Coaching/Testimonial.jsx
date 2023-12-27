import React, { forwardRef,useEffect,useState } from 'react';
import useIntersectionObserver from '../../Hooks/useIntersectionObserver';
import useScrollPosition from '../../Hooks/useScrollPosition';

const Testimonial = forwardRef((props, ref) => {
    const [observedRef, entry] = useIntersectionObserver({
        givenNode: ref,
        threshold: Array.from( Array(100), (_,idx) => idx *0.01 +.01 )
    });

    const scrollPosition = useScrollPosition();
    const [oldY, setOldY] = useState(0);

    const [style, setStyle] = useState('dissolve');
    const [direction, setDirection] = useState('down');

   useEffect(()=>{
        
        if(entry.intersectionRatio > 0.7){
            setStyle('appear');
        } else if(style === 'dissolve'){
            return;
        } else {
            setStyle('dissolve');
            if(oldY < scrollPosition.y){
                setDirection('up');
            } else {
                setDirection('down');
            }
        }
        
        setOldY(scrollPosition.y);
   },[entry.intersectionRatio]);


    return (
        <div className='testimonial' ref={observedRef}>
            <p className={style+direction}>{props.testimonial.testimonial}</p>
            <h4 className={style+direction}>{props.testimonial.name}</h4>
            <h6 className={style+direction}>{props.testimonial.occupation}</h6>
        </div>
    );
});

export default Testimonial;