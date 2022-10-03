import {useContext, useEffect, useRef} from 'react';
import './Actor.css';
import './Actor-phone.css';
import {Context} from '../../../Util/Context';

const Actor = ({actor, idx, displays, toggleActorBio, buttonStyles}) => {
    const {divAnimation} = useContext(Context);
    const ref = useRef(null);

    useEffect(()=>{
        // setFocusPoints({
        //     ...focusPoints,
        //     [actor.id]: ref,
        // })
    },[])
    return (
        <div
            key={`${actor.name}`}
            className={`actor ${actor.name}`}
            style={window.innerWidth < 1099 ?{backgroundImage: `url(${actor.img})`} : {animation: divAnimation[idx]}}
            >

            <div className="actor-box" >
                { window.innerWidth > 1099 ? <img className="actor-photo" src={`${actor.img}`} alt={`${actor.alt}`} /> : null}
                <p className="actor-bio"> 
                { window.innerWidth > 1099? 
                <>
                    <span className='actor-name'>{actor.name}</span>
                </>
                : null}
            <br/>
                
                    <span className='actor-bio-copy' 
                        id = {idx}
                        style={displays[idx]}
                        >
                        {actor.bio}
                    </span>
                    <br/>
                { window.innerWidth < 1100?
                <div className='actor-name-phone-box'>
                <span className='actor-name'>{actor.name} </span>
                <button className='actor-button' id={idx} onClick={toggleActorBio} style={buttonStyles[idx]}>Meet the actor.</button>
                <br/>
                </div>
                : null}
                
                    <a href={`${actor.imdb}`} target='_blank' rel='noreferrer'><img className='actor-a-tag' src='https://i.imgur.com/lTL68KV.png' alt='IMDb'/></a>
                </p>
            </div>
        </div>
    );
};

export default Actor;