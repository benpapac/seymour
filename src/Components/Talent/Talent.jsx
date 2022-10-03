import React, { useState, useEffect, useRef, useContext } from 'react';
import Actor from './Actor/Actor';
import './Talent.css';
import './Talent-phone.css';

import './LookBook.css';
import {Context} from '../../Util/Context';
import { useQuery, gql} from '@apollo/client';

import Footer from '../Footer/Footer';

import {ACTORS_QUERY} from '../../Util/GraphQL';
import LookBook from './Actor/LookBook';



const Talent = () => {
    const [displays, setDisplays] = useState({});
    const [buttonStyles, setButtonStyles] = useState({});
    const [initiated, setInitiated] = useState(false);


    const [idx, setIdx] = useState(1);
    const data = useQuery(ACTORS_QUERY);


    const [actors, setActors] = useState([]);

 

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

    const initiate = () => {
        setActors(data.data.actors);
            
            if(window.innerWidth < 1100){
                    setButtonStyles(Array(data.data.actors.length).fill({display: 'block'}))
                    setDisplays(data.data 
                        ? data.data.actors.reduce((accum, actor, idx) => {
                            return {...accum, [idx]: {display: 'none'}}
                        }, {} ) 
                        : null);
                    }
        setInitiated(true);
    }

    useEffect(()=>{
        if(data.data && !initiated) initiate();
       
 
        
    },[data.data]);

    return (
        <section className='talent-box'>
            { window.innerWidth > 1099 ? <LookBook idx={idx} setIdx={setIdx} /> : null}

			 {!(actors.length && displays) 
                ? (
                    <div className='loading-page'>
                        <h1 id='loading-message'>Loading...</h1>
                    </div>
                    )
                    
                    : (
                        <>
                    <Actor actor={actors[idx]} idx={idx} displays={displays} toggleActorBio={toggleActorBio} buttonStyles={buttonStyles} />
                    <Footer />
                    </>
                    )
                }
                
                {/*
                        : actors.map((actor, idx, arr) => (
                            <Actor actor={actor} focusPoints={focusPoints} idx={idx} displays={displays} toggleActorBio={toggleActorBio} buttonStyles={buttonStyles} setFocusPoints={setFocusPoints}/>
                        )) 
                    } */}
        </section>
    );
};

export default Talent;