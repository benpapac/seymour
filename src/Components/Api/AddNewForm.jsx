import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const NEW_ACTOR = gql`
    mutation newActor($name: String!, $img: String!, $alt: String, $imdb: String, $bio: String!){
        newActor(name: $name, img: $img, alt: $alt, imdb: $imdb, bio: $bio){
            id
            name
            img
            alt
            imdb
            bio
        }
    }
`;

const NEW_TESTIMONIAL = gql`
    mutation newTestimonial($name: String!, $occupation: String, $testimonial: String!){
        newTestimonial(name: $name, occupation: $occupation, testimonial: $testimonial){
            id
            name
            occupation
            testimonial
        }
    }
`;

const getItemType = (itemType) => itemType === 'actor' ? NEW_ACTOR : NEW_TESTIMONIAL ;

const AddNewForm = ({itemType}) => {
const [newItem, {data, loading, error}] = useMutation(getItemType(itemType));
const [submitted, setSubmitted] = useState(false);
const [formState, setFormState] = useState({});
const navigate = useNavigate();



const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/api/${itemType}s`)
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
    console.log(formState);
   const res = newItem({
        variables: {
            ...formState,
        },
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    console.log(res);

    setSubmitted(true);
    return navigate(`/api/${itemType}s`);
}


if(loading) return 'Submitting...';
if(error) return `Error, ${error.message}`;

    return (
        <>
        {!submitted ? (

            itemType === 'actor' 
            ? (
                 <form action="submit" onSubmit={handleSubmit} className='api-form'>
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
            ) : (
                <form action="submit" onSubmit={handleSubmit} className='api-form'>
                    <label htmlFor="name"> Name</label>
                    <input type="text" id="name" onChange={handleChange} value={formState.name}/>
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" id="occupation" onChange={handleChange} value={formState.occupation}/>
                    <label htmlFor="testimonial">Testimonial </label>
                    <textarea type="text" cols="50" rows="10" id="testimonial"  onChange={handleChange} value={formState.imtestimonial}/>
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            ) 
        ) : (submitted && (
            <div >
                <h1>Submission complete!</h1>
            </div>
        )
                
            )
    
        
        
        }
        <div>
            
        </div>
        </>
    );
};

export default AddNewForm;