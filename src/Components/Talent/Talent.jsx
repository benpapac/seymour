import React, { useEffect, useState, useRef } from 'react';
import './Talent.css';
import './LookBook.css';

const Talent = () => {
    const photos = require('../../Json/photos.json');
    const actors = require('../../Json/actors.json');
    const focusPoints = {
        focus1: useRef(null),
        focus2: useRef(null),
        focus3: useRef(null),
        focus4: useRef(null),
        focus5: useRef(null),
        focus6: useRef(null),
    }

    const chooseFocus = (e) => {
        focusPoints[e.target.id].current.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <>
        <section className='header'>
             <h2 >Talent</h2>
            <div className='lookbook' >
                {photos.photos.map(photo => {
                    return <img 
                        onClick={chooseFocus}
                        id={`${photo.focus}`} 
                        className={`thumbnail`} 
                        src={`${photo.img}`} 
                        alt={`${photo.alt}`} 
                    />
                })}
            </div>
        </section>
        <section className='talent'>
            {actors.actors.map(actor => {
                return (
                <div className={`actor ${actor.name}`}  style={{"background-color": `${actor.background}` }}ref={focusPoints[`${actor.focus}`]}>
                <div className="actor-photobox">
                    <img className='actor-photo' src={`${actor.img}`} alt={`${actor.alt}`}/>
                    <h2 className="name">{`${actor.name}`}</h2>
                </div>
                    <a  className='actor-a-tag' href={`${actor.imdb}`}>IMDb</a>
                    <p className="actor-bio">{`${actor.bio}`}</p>
                </div>
                )
            })}
        </section>
        </>
    );
};

export default Talent;