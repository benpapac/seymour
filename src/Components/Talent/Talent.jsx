import React from 'react';
import './Talent.css';


// You could have a function that returns html for a given set of parameters. Then, format each Actor to match. 
// OR, you could create a DB and back end that holds all of this info, and use a function to present it, using a GET.
const Talent = () => {
    return (
        <section className='talent'>
            <h2 className='header'>Talent</h2>
            <div className='left actor ben'>
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
        <div className='right actor ben2'>
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
    );
};

export default Talent;