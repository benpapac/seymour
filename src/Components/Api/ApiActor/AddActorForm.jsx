

import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NEW_ACTOR } from '../../../Util/GraphQL';

const ActorAddForm = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        alt: '',
        bio: '',
        img: '',
        imdb: '',
        name: ''
    });
    const [newActor, {error, loading, data}] = useMutation(NEW_ACTOR);

    const handleCancel = (e) => {
    e.preventDefault();
    navigate('/api/actors')
    }

const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.id;
    const val = e.target.value;

    setFormState({
        ...formState,
        [key]: val,
    })
}

const handleSubmit = (e) => {
    e.preventDefault();
   newActor({
        variables: {
            ...formState,
            date: new Date()
        },
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    navigate('/api/actors');
}
    return (
        <React.Fragment>
            <form 
                action="submit" 
                onSubmit={handleSubmit} 
                className='api-form'
            >
                <label htmlFor="name">Actor Name</label>
                <input type="text" id="name" onChange={handleChange} value={formState.name} />
                <label htmlFor="img">Actor Image URL</label>
                <textarea type="url" cols="40" id="img" onChange={handleChange} value={formState.img}/>
                <label htmlFor="alt">Alt text for Image</label>
                <input type="text" id="alt" onChange={handleChange} value={formState.alt}/>
                <label htmlFor="imdb">Imdb URL</label>
                <textarea type="url" cols="40" id="imdb" onChange={handleChange} value={formState.imdb}/>
                <label htmlFor="bio">Biography</label>
                <textarea type="text" cols="50" rows="10" id="bio" onChange={handleChange} value={formState.bio}/>
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
            {loading && <span>{'Loading'}</span>}
            {error && <span>{`Error: ${error.message}`}</span>}
        </React.Fragment>
    );
};

export default ActorAddForm;