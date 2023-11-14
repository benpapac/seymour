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
    const [idx, setIdx] = useState(1);

    useEffect(()=>{
        window.scroll(0,0);
    },[]);

    return (
        <section className='talent-box'>
                       { window.innerWidth > 1099 
                        ?   <>
                                <LookBook idx={idx} setIdx={setIdx} /> 
                                <Actor idx={idx} />
                                <Footer />
                            </> 
                        : <ActorPhone/>
            }
                
        </section>
    );
};

export default Talent;