import React, { useEffect, useState, useRef } from 'react';
import './Talent.css';
import './LookBook.css';
import actors from '../../Json/actors.json';
import Slideshow from '../Slideshow/Slideshow';

const Talent = () => {
    const [scrollHeight, setScrollHeight] = useState(0);

    const focusPoints = {
        focus1: useRef(null),
        focus2: useRef(null),
        focus3: useRef(null),
        focus4: useRef(null),
        focus5: useRef(null),
        focus6: useRef(null),
    }
    
    const chooseFocus = (e) => {
        focusPoints[e.target.id].current.scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    const scroll = (e) => {
        e.preventDefault();
        let childNodes = e.nativeEvent.target.childNodes;
        console.log(childNodes[childNodes.length-1].offsetTop);
  ;
    }

    return (
        <>
        {console.log(actors)}
            <h2 className='lookbook-title'>LookBook</h2>
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
            <div>

                <div className='tall-rectangle'
                     style={{transform: [scrollHeight]}}></div>
                <div className='long-rectangle' ></div>
                <div className='dot'></div>
                <div className='arm' ></div>
                <div className='circle' ></div>
                <div className='white-square' ></div>
            </div>

            {actors.map(actor => {
                return (
                <div key={`${actor.name}`} 
                    className={`actor ${actor.name}`}  
                    ref={focusPoints[`${actor.focus}`]}
                >
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
                    {console.log(actor.slideshow)}
                    <Slideshow slideshow={actor.slideshow}/>
                    {/* I want to create a slideshow here.*/}
                </div>
                    )
            })}
        </>
    );
};

export default Talent;