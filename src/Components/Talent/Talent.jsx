import React, { useState, useEffect } from 'react';
import Actor from './Actor/Actor';
import './Talent.css';
import './Talent-phone.css';
import './LookBook.css';

import Footer from '../Footer/Footer';
import LookBook from './Actor/LookBook';
import ActorsPhone from './Actor/ActorsPhone';

const Talent = () => {
    const [idx, setIdx] = useState(1);

    useEffect(()=>{
        window.scroll(0,0);
    },[]);

    return (
        <React.Fragment>
            { window.innerWidth > 1099 ?
                <React.Fragment>
                    <LookBook idx={idx} setIdx={setIdx} /> 
                    <Actor idx={idx} />
                    <Footer />
                </React.Fragment> :
                <ActorsPhone/>
            }
        </React.Fragment>
    );
};

export default Talent;