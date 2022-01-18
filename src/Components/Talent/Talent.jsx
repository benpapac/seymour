import React from 'react';
import './Talent.css';

const Talent = () => {
    return (
        <div className='actor'>
            <h2 className="name">Ben Papac</h2>
            <p className="blurb">Benjamin Papac is an actor known for his roles in Greenhouse Academy (2017-2020), Room 104 (2020), and Into the Badlands (2015). Benjamin made his Theatrical debut as Albus Potter in Harry Potter & the Cursed Child, SF (2019). He was born in California, and grew up near Atlanta, Georgia. He began his career in Atlanta and Baton Rouge, with roles in The Walking Dead (2014), Fantastic Four (2015), and others.</p>
            <img className="headshot" src="https://i.imgur.com/BxDTG47.jpg" alt="Ben's face" />
            <a className="a-tag" href="https://www.imdb.com/name/nm3621230/?ref_=fn_al_nm_1">IMDb</a>
        </div>
    );
};

export default Talent;