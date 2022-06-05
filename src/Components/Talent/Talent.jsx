import React, { useState, useEffect, useRef, useContext } from 'react';
import './Talent.css';
import './Actor/Actor-phone.css';
import './Actor/Actor.css';
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

    const displayLookbook = displayHOF.displayLookbook;

    return (
        <section className='talent-box'>
            { window.innerWidth > 1050 ? displayLookbook(chooseFocus) : null}

             
			{actors.map((actor, idx, arr) => {
				return (
                    <div
							key={`${actor.name}`}
							className={`actor ${actor.name}`}
							ref={focusPoints[`${actor.focus}`]}
                             style={window.innerWidth < 1050 ?{backgroundImage: `url(${actor.img})`} : null}
                    >
                        {window.innerWidth < 1050 ? <div className='talent-empty' /> : null}

                        <div className="actor-box" >
                            { window.innerWidth > 1050 ? <img className="actor-photo" src={`${actor.img}`} alt={`${actor.alt}`} /> : null}
                            <p className="actor-bio"> 
                            <p className='actor-name'>{actor.name}</p>
                                {actor.bio}
                                <br/>
                                <br/>
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