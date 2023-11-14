import React, { useContext } from 'react';
import { Context } from '../../../Util/Context';
import {} from '../../../Util/Callbacks';
import { useQuery } from '@apollo/client';
import { ACTORS_QUERY } from '../../../Util/GraphQL';

const LookBook = ({idx, setIdx}) => {
    // const actorsData = useQuery(ACTORS_QUERY).data?.actors;
    const {actorsData} = useContext(Context);
    const { divAnimation, setDivAnimation} = useContext(Context);

       const updateIndexes = async (e) => {
        e.preventDefault();

        setDivAnimation({
            ...divAnimation,
            [e.target.id]: 'actor-slide-up 2s',
            [idx]: 'actor-slide-out 2s',
        })

        setTimeout(() => {
            setIdx(e.target.id);
        }, 1090);
    }

    if(!actorsData || !actorsData.length){
        return  <div className='loading-page'>
                    <h1 id='loading-message'>Loading...</h1>
                </div>
    };
    
    return (
            <div className='lookbook'>
                {actorsData.map((actor, index) => {
                    return (
                        <>
                            <img
                                onClick={updateIndexes}
                                id={index}
                                className={`thumbnail`}
                                src={`${actor.img}`}
                                alt={`${actor.alt}`}
                                style={index === 0 ? { marginTop: '0em' } : null}
                            />
                        </>
                    );
                })}
            </div>
    );
};

export default LookBook;