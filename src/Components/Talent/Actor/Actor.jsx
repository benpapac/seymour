import React, { useContext } from 'react';
import { TalentContext } from '../../../Util/Context';
import { displayLookbook } from '../../../Util/displays';
import Slideshow from '../Slideshow/Slideshow';
import './Actor.css';

const Actor = ({ actor, focusPoints }) => {
    const talentContext = useContext(TalentContext);
    const chooseFocus = talentContext.chooseFocus;
    const slideshow = actor.slideshow;
    return (
        <>
            <div className="actor-photobox">
                <Slideshow slideshow={slideshow}/>
                {/* <img className={`actor-photo`} 
                    style={{"boxShadow": `30px 16px ${actor['img-background']}`}}src={`${actor.img}`} 
                    alt={`${actor.alt}`}
                /> */}
            </div>
            {/* <h1 className="actor-name">{`${actor.name}`}</h1> */}
            <p className="actor-bio" style={{"boxShadow": `-30px 16px ${actor['img-background']}`}}> <span className='actor-name'>{actor.name}</span>
            <br />
            {actor.bio}
            <br/>
            <br/>
                <a  className='actor-a-tag' href={`${actor.imdb}`}>IMDb</a>
            </p>
        </>
    );
};

export default Actor;