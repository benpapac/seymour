import React, { useState, useEffect, useRef, useContext } from 'react';
import './Talent.css';
import './Talent-phone.css';
import './Actor/Actor.css';
import './Actor/Actor-phone.css';
import './LookBook.css';
// import actors from '../../Json/actors.json';
import {Context} from '../../Util/Context';
import { useQuery, gql} from '@apollo/client';
// import  data  from '../../Json/actors.json';

import Footer from '../Footer/Footer';



const ACTORS_QUERY = gql`
{
    actors {
        id
        name
        img
        alt
        imdb
        bio
    }
}
`

const Talent = () => {
    // const scrollPosition = useScrollPosition();
    const context = useContext(Context);
    const chooseFocus = context.chooseFocus;
    // const [focusPoints, setFocusPoints] = useState({});
    const [displays, setDisplays] = useState({});
    const [buttonStyles, setButtonStyles] = useState([]);

    // for when db is properly connected
    const data = useQuery(ACTORS_QUERY);


    const [actors, setActors] = useState([]);

    // const displayLookbook = (chooseFocus) => {
    //     return (
    //         <div className='lookbook'>
    //             {actors.map((actor, index) => {
    //                 return (
    //                     <>
    //                         <img
    //                             onClick={chooseFocus}
    //                             id={`${actor.id}`}
    //                             className={`thumbnail`}
    //                             src={`${actor.img}`}
    //                             alt={`${actor.alt}`}
    //                             style={index === 0 ? { marginTop: '0em' } : null}
    //                         />
    //                     </>
    //                 );
    //             })}
    //         </div>
    //     );
    // };
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
        // if(data) {
        //     setActors(data.data.actors);
        // }


        //for when dp is properly connected
        // console.log(data);
        if(data.data) {
            setActors(data.data.actors);


        //     actors.map(actor => {

        //         setFocusPoints({
        //             ...focusPoints,
        //             [actor.id]: useRef,
        //         })
        //     })
        }
       
        //testing
        // setActors(data);

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
    },[data]);

    return (
        <section className='talent-box'>
            {/* { window.innerWidth > 1099 ? displayLookbook(chooseFocus) : null} */}

             
			{actors && actors.map((actor, idx, arr) => {

				return (
                    <div
							key={`${actor.name}`}
							className={`actor ${actor.name}`}
							// ref={focusPoints[`focus${actor.id}`]}
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
			})}

            <Footer />
        </section>
    );
};

export default Talent;