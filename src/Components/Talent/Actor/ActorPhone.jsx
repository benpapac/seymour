import React, {useState} from 'react';

const ActorPhone = ({actor, idx}) => {
    const [bioMessage, setBioMessage] = useState('show bio.');
    const [translate, setTranslate] = useState('-100');

    const toggleActorBio = (e) => {
        e.preventDefault();
        setBioMessage(bioMessage === 'show bio.' ? 'hide bio.' : 'show bio.');
        setTranslate(translate === '-100' ? '0' : '-100');
    };
    
    return (
       <div 
            key={`${actor.name}`}
            className={`actor`}
            style={{backgroundImage: `url(${actor.img})` }}
        >
             <div 
                className={'actor-bio-copy'}
                style={{transform: `translateX(${translate}%)`}} 
             >
                <p>
                    <img 
                    className={'actor-thumbnail'} 
                    src={actor.img} 
                    alt={actor.name}
                />
                    {actor.bio}
                </p>
            </div>
            <div className='actor-name-phone-box'>
                <span className='actor-name'>{actor.name}</span>
                <button 
                    className='actor-button' 
                    id={idx} 
                    onClick={toggleActorBio} 
                >
                    {bioMessage}
                </button>
            </div>
        </div>
    );
};

export default ActorPhone;