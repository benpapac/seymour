import React, { useState, useEffect, useRef, useContext } from 'react';
import './Talent.css';
import './Talent-phone.css';
import './Actor/Actor.css';
import './Actor/Actor-phone.css';
import './LookBook.css';
import actors from '../../Json/actors.json';
import * as displayHOF from '../../Util/displays.js';
import {Context} from '../../Util/Context';

import Footer from '../Footer/Footer';

const Talent = () => {
    // const scrollPosition = useScrollPosition();
    const context = useContext(Context);
    const chooseFocus = context.chooseFocus;
    const focusPoints = context.focusPoints;
    const [displays, setDisplays] = useState({});
    const [buttonStyles, setButtonStyles] = useState([]);

    const displayLookbook = displayHOF.displayLookbook;
    const toggleActorBio = (e) => {
        let idx = e.target.id;
        let myArray = buttonStyles;
        myArray[idx] = {display: 'none'};
        setButtonStyles(myArray);

        let key = e.target.id;
        setDisplays({
            ...displays,
            [key]: displays[key]['display'] === 'none' ? {display: 'block'} : {display: 'none'}
        });
    }

    useEffect(()=>{

       
        if(window.innerWidth < 1100){
            if(actors.length){
                setButtonStyles(Array(actors.length).fill({dislay: 'block'}))
            }
            setDisplays(actors 
                ? actors.reduce((accum, actor, idx) => {
                return {...accum, [idx]: {display: 'none'}}
            }, {} ) 
            : null);
        }
    },[]);

    return (
        <section className='talent-box'>
            { window.innerWidth > 1099 ? displayLookbook(chooseFocus) : null}

             
			{actors.map((actor, idx, arr) => {
				return (
                    <div
							key={`${actor.name}`}
							className={`actor ${actor.name}`}
							ref={focusPoints[`${actor.focus}`]}
                             style={window.innerWidth < 1099 ?{backgroundImage: `url(${actor.img})`} : null}
                    >

                        <div className="actor-box" >
                            { window.innerWidth > 1099 ? <img className="actor-photo" src={`${actor.img}`} alt={`${actor.alt}`} /> : null}
                            <p className="actor-bio"> 
                            { window.innerWidth > 1099? 
                            <>
                                <span className='actor-name'>{actor.name}</span>
                            </>
                            : null}
                           
                               
                                <span className='actor-bio-copy' 
                                    id = {idx}
                                    style={displays[idx]}
                                >
                                    {actor.bio}
                                </span>
                                <br/>
                            { window.innerWidth < 1100?
                            <div className='actor-name-phone-box'>
                             <span className='actor-name'>{actor.name} 
                             </span>
                             <button className='actor-button' id={idx} onClick={toggleActorBio} style={buttonStyles[idx]}>Meet the actor.</button>
                             <br/>
                            </div>
                             : null}
                             
                                <a href={`${actor.imdb}`} target='_blank' rel='noreferrer'><img className='actor-a-tag' src='https://i.imgur.com/lTL68KV.png' alt='IMDb'/></a>
                            </p>
                        </div>
                    </div>
				);
			})}

            <Footer />
        </section>
    );
};

export default Talent;