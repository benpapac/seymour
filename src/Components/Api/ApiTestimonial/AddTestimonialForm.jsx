import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NEW_TESTIMONIAL} from '../../../Util/GraphQL.js';

const AddTestimonialForm = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({});
    const [newTestimonial, {error, loading, data}] = useMutation(NEW_TESTIMONIAL);

    const handleCancel = (e) => {
    e.preventDefault();
    navigate('/api/testimonials')
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
    newTestimonial({
            variables: {
                ...formState,
                date: new Date()
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
    });
    navigate('/api/testimonials');
};

    return (
        <React.Fragment>
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
            {loading && <span>{'Loading'}</span>}
            {error && <span>{`Error: ${error.message}`}</span>}
        </React.Fragment>
    );
};

export default AddTestimonialForm;