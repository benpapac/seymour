import {useReducer, useState, useEffect, useContext} from 'react';
import "./Slideshow.css";
import {Context} from '../../../Util/Context';

const Slideshow = ({slideshow}) => {
    const [count, setCount] = useState(0);
    const talentContext = useContext(Context);
    const zoom = talentContext.zoom;
    const zoomIn = talentContext.zoomIn;


    useEffect( () => {
        setTimeout(  (count) => {
                setCount((count) => count === slideshow.length-1 ? 0 : count + 1);
            }, 6000)
        }, [count]);

    const copy = (slideshow) => {
        return copy === slideshow.length -1 ? slideshow[0].alt : slideshow[count].alt;
    }

return (
    <>
    <section className="slideshow-box" style={{display: `${zoom.show ? 'hidden' : 'flex'}`}}>
     <div className='slideshow' onClick={zoomIn}>
            <div className="slider" 
                style={{transform: `translate3d(0, ${-count*(100/slideshow.length)}%, 0)`}}
            >
                {slideshow.map(
                    (slide, index) => {
                       return <img className='slide'
                                    
                                style={{
                                    "align-self": "center",
                                "boxShadow": `10px 6px ${slide['background']}`}}
                                key={index} 
                                src={`${slide.src}`} 
                                alt={`${slide.alt}`} 
                            />
                        
                })}
            </div>
        </div>
        </section>
        {/* <div className="copy-box" style={{display: `${zoom.show ? 'hidden' : 'flex'}`}}>
            <div className="copy-slider" 
                style={{transform: `translate3d(${-count*(100/slideshow.length)}%, 0, 0)`}}
            >
                {slideshow.map(
                    (slide, index) => {
                       return <p className='copy' key={index} >
                                {slide.alt}
                            </p>
                        
                })}
         </div>

            <p className='copy'>{copy(slideshow)}</p>
    </div> */}
    </>
)
};

export default Slideshow;