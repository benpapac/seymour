import {useState, useEffect} from 'react';
import "./Slideshow.css";

const Slideshow = ({slideshow}) => {
    const [count, setCount] = useState(0);
    useEffect( () => {
        // console.log(slideshow);
        setTimeout(  (count) => {
             setCount((count) => count === slideshow.length-1 ? 0 : count + 1);
            }, 4500)
        }, [count]);

    const copy = (slideshow) => {
        return copy === slideshow.length -1 ? slideshow[0].alt : slideshow[count].alt;
    }


return (
    <section className="slideshow-box">
     <div className='slideshow'>
            <div className="slider" 
                style={{transform: `translate3d(0, ${-count*(100/slideshow.length)}%, 0)`}}
            >
                {slideshow.map(
                    (slide, index) => {
                       return <img className = 'slide' 
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
            <p className='copy'>{copy(slideshow)}</p>
    </section>
)
};

export default Slideshow;