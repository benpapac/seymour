import React, { useState, useEffect, useRef, useContext } from 'react';
import Actor from './Actor/Actor';
import './Talent.css';
import './Talent-phone.css';

import './LookBook.css';
import {Context} from '../../Util/Context';
import { useQuery, gql} from '@apollo/client';

import Footer from '../Footer/Footer';

import {ACTORS_QUERY} from '../../Util/GraphQL';



const Talent = () => {
    // const scrollPosition = useScrollPosition();
    const context = useContext(Context);
    const ref = useRef(null);
    const chooseFocus = context.chooseFocus;
    const [focusPoints, setFocusPoints] = useState([]);
    const [displays, setDisplays] = useState({});
    const defaultStyle = {display: 'none'};
    const [buttonStyles, setButtonStyles] = useState({});

    const data = useQuery(ACTORS_QUERY);


    const [actors, setActors] = useState([]);

    // const displayLookbook = (chooseFocus) => {
    //                 console.log(focusPoints);
    //     return (
    //         <div className='lookbook'>
    //             {actors.map((actor, index) => {
    //                 return (
    //                     <>
    //                         <img
    //                             onClick={()=> focusPoints[actor.id].current.scrollIntoView()}
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
        let key = e.target.id;
        let myObj = buttonStyles;
        myObj[key] = {display: 'none'};
        setButtonStyles(myObj);

        setDisplays({
            ...displays,
            [key]: displays[key]['display'] === 'none' ? {display: 'block'} : {display: 'none'}
        });
    }

    useEffect(()=>{
        if(data.data) {
            setActors(data.data.actors);
            // setFocusPoints(Array(data.data.actors.length).fill(ref));

            // let myObj = data.data.actors.reduce((obj, actor) => {
            //     obj = {
            //         ...obj,
            //         [actor.id]: ref,
            //     };
            //     return obj;
            // },{})

            // setFocusPoints({
            //     ...myObj
            // });
        }

         if(window.innerWidth < 1100){
            if(data.data){
                setButtonStyles(Array(data.data.actors.length).fill({display: 'block'}))
                setDisplays(data.data 
                    ? data.data.actors.reduce((accum, actor, idx) => {
                        return {...accum, [idx]: {display: 'none'}}
                    }, {} ) 
                    : null);
                }
        }
       
        //testing
        // setActors(data);

        
    },[data]);

    return (
        <section className='talent-box'>
            {/* { window.innerWidth > 1099 ? displayLookbook(chooseFocus) : null} */}

			{!(actors.length && displays) 
                ? (
                <div className='loading-page'>
                    <h1 id='loading-message'>Loading...</h1>
                </div>
                )
                : actors.map((actor, idx, arr) => (
                    <Actor actor={actor} focusPoints={focusPoints} idx={idx} displays={displays} toggleActorBio={toggleActorBio} buttonStyles={buttonStyles} setFocusPoints={setFocusPoints}/>
                )) 
            }
            <Footer />
        </section>
    );
};

export default Talent;