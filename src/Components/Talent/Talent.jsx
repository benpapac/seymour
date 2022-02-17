import React, { useEffect, useState, useRef } from 'react';
import './Talent.css';
import './LookBook.css';
import actors from '../../Json/actors.json';
import {displayActors, displayBackground, displayLookbook} from '../../Util/displays.js';

const Talent = () => {
    // const [scrollHeight, setScrollHeight] = useState(0);
    const [display, setDisplay] = useState('');

    const focusPoints = {
        focus1: useRef(null),
        focus2: useRef(null),
        focus3: useRef(null),
        focus4: useRef(null),
        focus5: useRef(null),
        focus6: useRef(null),
    }
    
    const chooseFocus = (e) => {
        e.preventDefault();
        focusPoints[e.target.id].current.scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    const scroll = (e) => {
        e.preventDefault();
        let childNodes = e.nativeEvent.target.childNodes;
        console.log(childNodes[childNodes.length-1].offsetTop);
  ;
    }


    return (
        <>
        {console.log(actors)}
            <h2 className='lookbook-title'>LookBook</h2>
            <div className={`lookbook ${display}`} 
                onHover={() => setDisplay('expand')}
                onMouseLeave={() => setDisplay('')}
            >
                    {displayLookbook(chooseFocus)}
            </div>
            {displayBackground()}
            {displayActors(focusPoints)}
        </>
    );
};

export default Talent;