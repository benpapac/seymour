import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ACTORS_QUERY } from '../../../Util/GraphQL';
import { Context } from '../../../Util/Context';

const ActorPhone = () => {
    // const actorsData = useQuery(ACTORS_QUERY).data?.actors;
    const {actorsData} = useContext(Context);
    const [displays, setDisplays] = useState(
        actorsData ?
            actorsData.reduce(
                (accum, actor, idx) => {
                    return {...accum, [idx]: {display: 'none'}}
                },
            {} ) :
        {}
    );
    const [buttonStyles, setButtonStyles] = useState(
        Array(actorsData ? Number(actorsData.length): 0)
            .fill({display: 'block'})
    );

    const toggleActorBio = (e) => {
    let key = e.target.id;
    let myObj = buttonStyles;
    myObj[key] = {display: 'none'};
    setButtonStyles(myObj);

    setDisplays({
        ...displays,
        [key]: displays[key]['display'] === 'none' ? {display: 'block'} : {display: 'none'}
    });
};

    if(!actorsData || !actorsData.length){
        return  <div className='loading-page'>
                    <h1 id='loading-message'>Loading...</h1>
                </div>
    };

    return (
        <>
        {actorsData.map((actor, idx) => (
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