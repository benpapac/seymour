import React, { useContext } from 'react';
import { TalentContext } from '../../../Util/Context';
import { displayLookbook } from '../../../Util/displays';
import './Actor.css';

const Actor = ({ actor, focusPoints }) => {
    const talentContext = useContext(TalentContext);
    const chooseFocus = talentContext.chooseFocus;
    return (
        <>
            <div className="actor-photobox">
                <img className={`actor-photo`} 
                    style={{"boxShadow": `30px 16px ${actor['img-background']}`}}src={`${actor.img}`} 
                    alt={`${actor.alt}`}
                />
            </div>
            <h1 className="actor-name">{`${actor.name}`}</h1>
            <p className="actor-bio" style={{"boxShadow": `-30px 16px ${actor['img-background']}`}}>{`${actor.bio}`}
            <br/>
                <a  className='actor-a-tag' href={`${actor.imdb}`}>IMDb</a>
            </p>
        </>
    );
};

export default Actor;