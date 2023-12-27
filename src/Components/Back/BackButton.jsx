import React from 'react';
import './BackButton.css';
import useScrollPosition from '../../Hooks/useScrollPosition';

const BackButton = () => {
   const {y} = useScrollPosition();
   console.log('y: ', y);

    return (
        <div 
                id={y < 250 ? 'invisible' : null}
                className={'back-button'} 
                onClick={() => {
                    window.scrollTo({top: -100, behavior: 'smooth'});
                }} 
                > 
                    {'Back'}
            </div>
    );
};

export default BackButton;