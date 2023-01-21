import {useContext, useEffect, useState } from 'react';
import './Actor.css';
import './Actor-phone.css';
import {Context} from '../../../Util/Context';

const Actor = ({ actor, idx }) => {
    const { divAnimation} = useContext(Context);

    return (
        <div
            className={`actor ${actor.name}`}
            style={{animation: divAnimation[idx]}}
            >

            <div className="actor-box" >
                <img className="actor-photo" src={`${actor.img}`} alt={`${actor.alt}`} />
                <p className="actor-bio"> 
                    <span className='actor-name'>{actor.name}</span>
                    <br/>
                    <span className='actor-bio-copy' id = {idx}  >
                        {actor.bio}
                    </span>
                    <br/>
                    <a href={`${actor.imdb}`} target='_blank' rel='noreferrer'><img className='actor-a-tag' src='https://i.imgur.com/lTL68KV.png' alt='IMDb'/></a>
                </p>
            </div>
        </div>
    );
};

export default Actor;