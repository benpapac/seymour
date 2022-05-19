import { useState, } from 'react';
import useScrollPosition from './useScrollPosition';

const useTextSlides = () => {
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
            });

    const slideIn = () => {
        if (slides[slide].x === 0) {
            console.log(slide);
            setSlides({
                ...slides,
                [slide]: {
                    ...slides[slide],
                    y:
                        slide === 'slideThree'
                            ? 0
                            : slides[slide].y === 150
                            ? 150
                            : slides[slide].y + 1.5,
                },
            });
        } else
            setSlides({
                ...slides,
                [slide]: {
                    x: slides[slide].x === 0 ? 0 : slides[slide].x - 1,
                    y: slides[slide].y,
                },
            });
    };

    const slideOut = () => {
        if (sign === '+') {
            setSlides({
                ...slides,
                [slide]: {
                    ...slides[slide],
                    y: slides[slide].y + 1.5,
                },
            });
        } else
            setSlides({
                ...slides,
                [slide]: {
                    ...slides[slide],
                    y: slides[slide].y - 1.5,
                },
            });
    };

    const updateSlide = (scrollingDown) => {
        if (scrollingDown) {
            setSign('-');
            slideIn();
        } else {
            if (slides[slide].y === 0) {
                setSign('+');
            }
            slideOut();
        }
    };

    const handleSlides = (scrollingDown) => {
        if (slides.slideOne.y !== 150) {
            setSlide('slideOne');
            updateSlide(scrollingDown);
        } else if (slides.slideTwo.y !== 150) {
            setSlide('slideTwo');
            updateSlide(scrollingDown);
        } else {
            setSlide('slideThree');
            updateSlide(scrollingDown);
        }
    };

    return (
        <div>
            
        </div>
    );
};

export default useTextSlides;