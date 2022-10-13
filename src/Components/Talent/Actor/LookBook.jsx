import React, { useContext } from 'react';
import { Context } from '../../../Util/Context';
import {} from '../../../Util/Callbacks';

const LookBook = ({ actors, idx, setIdx}) => {
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
    return (
            <div className='lookbook'>
                {actors.map((actor, index) => {
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