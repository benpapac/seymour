import React, { useState, useEffect } from 'react';
import Actor from './Actor/Actor';
import './Talent.css';
import './Talent-phone.css';
import './LookBook.css';

import { useQuery } from '@apollo/client';
import { ACTORS_QUERY } from '../../Util/GraphQL';

import Footer from '../Footer/Footer';
import LookBook from './Actor/LookBook';
import ActorPhone from './Actor/ActorPhone';

const Talent = () => {
    const actorsData = useQuery(ACTORS_QUERY).data;
    const [actors, setActors] = useState([]);
    const [idx, setIdx] = useState(1);

    useEffect(()=>{
        actorsData && setActors(actorsData.actors);
    }, [actorsData]);

    useEffect(()=>{
        window.scroll(0,0);
    },[]);

    if(!actors[0]){
        return  <div className='loading-page'>
                        <h1 id='loading-message'>Loading...</h1>
                    </div>
    }

    return (
        <section className='talent-box'>
                       { window.innerWidth > 1099 
                        ?   <>
                                <LookBook actors={actors} idx={idx} setIdx={setIdx} /> 
                                <Actor actor={actors[idx]} idx={idx} />
                                <Footer />
                            </> 
                        : <ActorPhone  actors={actors}/>
            }
                
        </section>
    );
};

export default Talent;