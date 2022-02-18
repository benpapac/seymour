import React, { useState, useRef, useContext } from 'react';
import './Talent.css';
import './LookBook.css';
import actors from '../../Json/actors.json';
import * as displayHOF from '../../Util/displays.js';
import {TalentContext} from '../../Util/Context';
import Zoom from './Zoom/Zoom';

const Talent = () => {
    // const [scrollHeight, setScrollHeight] = useState(0);
    const talentContext = useContext(TalentContext);
    const chooseFocus = talentContext.chooseFocus;
    const focusPoints = talentContext.focusPoints;

    const [display, setDisplay] = useState('');
 
    const displayActors = displayHOF.displayActors;
    const displayBackground = displayHOF.displayBackground;
    const displayLookbook = displayHOF.displayLookbook

    const scroll = (e) => {
        e.preventDefault();
        let childNodes = e.nativeEvent.target.childNodes;
        console.log(childNodes[childNodes.length-1].offsetTop);
  ;
    }


    return (
        <>
            {displayLookbook(chooseFocus)}
            {displayActors(focusPoints, chooseFocus)}
        </>
    );
};

export default Talent;