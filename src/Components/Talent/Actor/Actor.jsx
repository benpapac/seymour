import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Context } from '../../../Util/Context';
import { displayLookbook } from '../../../Util/displays';
import Slideshow from '../Slideshow/Slideshow';
import './Actor.css';
import useScrollPosition from '../../../Hooks/useScrollPosition';

const Actor = ({ actor, idx, arr, focusPoints }) => {
    const talentContext = useContext(Context);
    const chooseFocus = talentContext.chooseFocus;
    const slideshow = actor.slideshow;
    const windowWidth = window.innerWidth;
    const scrollPosition = useScrollPosition();
    const [xTrans, setXTrans] = useState(100); //this will become a percentage

    const checkWidth = () => {
        return windowWidth < 1100 ? `url(${actor.img})` : null;
    }

   const checkScroll = (idx, arr) => {
        //y as a ratio
        let yDiff = Math.floor(scrollPosition.y / window.innerHeight);


        //idx / arr length
        let currentPos = Math.floor(idx/ arr.length);
        let nextPos = Math.floor((idx + 1) / arr.length);
        // compare yScroll to length of array, to make sure we are focused on our current index.
       if (yDiff >= currentPos && yDiff < nextPos){
           // y could be a super high number. So simply subtracting y will get crazy. WE need to make it a percentage value. 
           // The percentage value whould be where y lives within the desired range.

           // x should approach 0, as y/?? increases toward 100.
            setXTrans({...xTrans, idx: (100 - yDiff)});
       }
    }

    useEffect ( ()=> {
        console.log(scrollPosition.y);
        checkScroll(idx, arr);
    }, [scrollPosition.y])

    return (
        <>
            <div className="actor-box" style={{backgroundImage: checkWidth()}}>
                <div className='empty'></div>
                {windowWidth >= 1100 ? <img className="actor-photo" src={`${actor.img}`} alt={`${actor.alt}`} /> : null }
                <p className="actor-bio"> 
                <p className='actor-name'>{actor.name}</p>
                    {actor.bio}
                    <br/>
                    <br/>
                    <a href={`${actor.imdb}`} target='_blank' rel='noreferrer'><img className='actor-a-tag' src='https://i.imgur.com/lTL68KV.png' alt='IMDb'/></a>
                </p>
            </div>
            {/* <h1 className="actor-name">{`${actor.name}`}</h1> */}
        </>
    );
};

export default Actor;