import {useReducer, useState, useEffect} from 'react';
import "./Slideshow.css";

const Slideshow = ({slideshow}) => {
    const [count, setCount] = useState(0);
    const [zoom, setZoom] = useState({
        show: false,
        src: '',
        alt: '',
    });


    useEffect( () => {
        setTimeout(  (count) => {
                setCount((count) => count === slideshow.length-1 ? 0 : count + 1);
            }, 6000)
        }, [count]);

    const copy = (slideshow) => {
        return copy === slideshow.length -1 ? slideshow[0].alt : slideshow[count].alt;
    }

    const zoomIn = (e) => {
        e.preventDefault();
        setZoom({
            show: true,
            src: e.target.src,
            alt: e.target.alt,
                })
    }

    const zoomOut = (e) => {
        e.preventDefault();
        setZoom({
            show: false,
            src: '',
            alt: ''
        })
    }


return (
    <>
    <div className='zoom' 
         style={{
            backgroundColor: `${!zoom.show ? 'white' : 'rgba(0,0,0,0.4)'}`,
            zIndex: `${!zoom.show ? -1 : 1}`
                }}
    >
    <img className='zoom-photo'
         onClick={zoomOut}
         style={{display: `${zoom.show ? 'block' : 'hidden'}`}} 
         src={`${zoom.src}`}  
         alt={`${zoom.alt}`}
    /> 
    </div>
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
        <section className="copy-box" style={{display: `${zoom.show ? 'hidden' : 'flex'}`}}>
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
    </section>
    </>
)
};

export default Slideshow;