import React, { useEffect, useState, useRef } from 'react';
import './Talent.css';
import '../Test/LookBook.css';

const Talent = () => {
    const focusPoints = {
        focus1: useRef(null),
        focus2: useRef(null),
        focus3: useRef(null),
        focus4: useRef(null),
        focus5: useRef(null),
        focus6: useRef(null),
    }
    const photos = require('../../Json/photos.json');

    const [currentActor, setCurrentActor] = useState('Ben'); 

    useEffect(() => {

    },[])

    const chooseFocus = (e) => {
        setCurrentActor(e.target.id);
        console.log(focusPoints[e.target.id].current);
        focusPoints[e.target.id].current.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <>
         <h2 className='header'>Talent</h2>
        <div className='lookbook' >
        {photos.photos.map(photo => {
        return <img 
                    onClick={chooseFocus}
                    id={`${photo.focus}`} 
                    className={`thumbnail`} 
                    src={`${photo.img}`} 
                    alt={`${photo.alt}`} 
                />
        })}
        </div>
        <section className='talent'>
            <div className='left actor ben' ref={focusPoints.focus1}>
                <div className="actor-photobox">
                    <img className='actor-photo' src='https://i.imgur.com/BxDTG47.jpg' alt='Ben Papac'/>
                    <h2 className="name">Ben Papac</h2>
            {/* <img className="headshot" src="https://i.imgur.com/BxDTG47.jpg" alt="Ben's face" /> */}
                </div>
                 <div className='actor-a-tag'>
                    <a  href="https://www.imdb.com/name/nm3621230/?ref_=fn_al_nm_1">IMDb</a>
                    <a  href="">Reel</a>
                </div>
            <p className="actor-bio">Benjamin Papac is an actor known for his roles in Greenhouse Academy (2017-2020), Room 104 (2020), and Into the Badlands (2015). Benjamin made his Theatrical debut as Albus Potter in Harry Potter & the Cursed Child, SF (2019). He was born in California, and grew up near Atlanta, Georgia. He began his career in Atlanta and Baton Rouge, with roles in The Walking Dead (2014), Fantastic Four (2015), and others.</p>
        </div>
        <div className='right actor ben2' ref={focusPoints.focus2} >
            <div className="actor-photobox">
                <img className='actor-photo' src='https://i.imgur.com/BxDTG47.jpg' alt='Ben Papac'/>
                <h2 className="name">Ben Papac</h2>
            </div>
            <div className='actor-a-tag'>
                <a  href="https://www.imdb.com/name/nm3621230/?ref_=fn_al_nm_1">IMDb</a>
                <a  href="">Reel</a>
            </div>
            <p className="actor-bio">Benjamin Papac is an actor known for his roles in Greenhouse Academy (2017-2020), Room 104 (2020), and Into the Badlands (2015). Benjamin made his Theatrical debut as Albus Potter in Harry Potter & the Cursed Child, SF (2019). He was born in California, and grew up near Atlanta, Georgia. He began his career in Atlanta and Baton Rouge, with roles in The Walking Dead (2014), Fantastic Four (2015), and others.</p>
        </div>
        <div className='right actor ben3' ref={focusPoints.focus3} >
            <div className="actor-photobox">
                <img className='actor-photo' src='https://i.imgur.com/BxDTG47.jpg' alt='Ben Papac'/>
                <h2 className="name">Ben Papac</h2>
            </div>
            <div className='actor-a-tag'>
                <a  href="https://www.imdb.com/name/nm3621230/?ref_=fn_al_nm_1">IMDb</a>
                <a  href="">Reel</a>
            </div>
            <p className="actor-bio">Benjamin Papac is an actor known for his roles in Greenhouse Academy (2017-2020), Room 104 (2020), and Into the Badlands (2015). Benjamin made his Theatrical debut as Albus Potter in Harry Potter & the Cursed Child, SF (2019). He was born in California, and grew up near Atlanta, Georgia. He began his career in Atlanta and Baton Rouge, with roles in The Walking Dead (2014), Fantastic Four (2015), and others.</p>
        </div>
        </section>
        </>
    );
};

export default Talent;