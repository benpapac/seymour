import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Util/Context';
import ActorPhone from './ActorPhone';
import './Actor-phone.css';

const ActorsPhone = () => {
    const {actorsData} = useContext(Context);

    if(!actorsData){
        return  <div className='loading-page'>
                    <h1 id='loading-message'>Loading...</h1>
                </div>
    };

    return (
        <React.Fragment>
            {actorsData.map((actor, idx) => (
                <ActorPhone actor={actor} idx={idx}/>
            ))}
        </React.Fragment>
    );
};

export default ActorsPhone;