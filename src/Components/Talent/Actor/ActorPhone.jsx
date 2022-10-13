import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Util/Context';
import { gql, useQuery } from '@apollo/client';
import { ACTORS_QUERY } from '../../../Util/GraphQL';

const ActorPhone = ({actors}) => {
        const [displays, setDisplays] = useState({});
    const [buttonStyles, setButtonStyles] = useState({});

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
            
            if(window.innerWidth < 1100){
                    setButtonStyles(Array(actors.length).fill({display: 'block'}))
                    setDisplays(actors.reduce((accum, actor, idx) => {
                            return {...accum, [idx]: {display: 'none'}}
                        }, {} ));
                    }
    }

    useEffect(()=>{
        initiate();
    },[]);


    return (
        <>
        {actors[0] && actors.map((actor, idx) => (
            <div key={`${actor.name}`}
                className={`actor`}
                style={{backgroundImage: `url(${actor.img})` }}>

                <p className='actor-bio'>
                    <span className='actor-bio-copy' style={displays[idx]} >{actor.bio}</span>
                    <div className='actor-name-phone-box'>
                        <span className='actor-name'>{actor.name} </span>
                        <button className='actor-button' id={idx} onClick={toggleActorBio} style={buttonStyles[idx]}>Meet the actor.</button>
                    </div>
                </p>
                <br/>
            </div>
        ))}
        </>
    );
};

export default ActorPhone;