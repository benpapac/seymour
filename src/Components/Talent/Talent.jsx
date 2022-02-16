import React, { useEffect, useState, useRef } from 'react';
import './Talent.css';
import './LookBook.css';
import actors from '../../Json/actors.json';
import Slideshow from '../Slideshow/Slideshow';

const Talent = () => {

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
        {console.log(actors)}
        <section className='header'>
            <div className='lookbook' >
                {actors.map(actor => {
                    return <img 
                        onClick={chooseFocus}
                        id={`${actor.focus}`} 
                        className={`thumbnail`} 
                        src={`${actor.img}`} 
                        alt={`${actor.alt}`} 
                    />
                })}
            </div>
        </section>
        <section className='talent'>
            {actors.map(actor => {
                return (
                <div key={`${actor.name}`} 
                    className={`actor ${actor.name}`}  
                    style={{"backgroundColor": `${actor.background}` }}
                    ref={focusPoints[`${actor.focus}`]}
                >
                    <div className="actor-photobox">
                        <img className={`actor-photo`} 
                            style={{"boxShadow": `30px 16px ${actor['img-background']}`}}src={`${actor.img}`} 
                            alt={`${actor.alt}`}
                        />
                    </div>
                    <h2 className="actor-name">{`${actor.name}`}</h2>
                    <p className="actor-bio">{`${actor.bio}`}
                    <br/>
                        <a  className='actor-a-tag' href={`${actor.imdb}`}>IMDb</a>
                    </p>
                    {console.log(actor.slideshow)}
                    <Slideshow slideshow={actor.slideshow}/>
                    {/* I want to create a slideshow here.*/}
                </div>
                    )
            })}
        </section>
        </>
    );
};

export default Talent;