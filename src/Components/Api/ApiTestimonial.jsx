
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import TestimonialApiForm from './TestimonialApiForm';

    const TESTIMONIALS_QUERY = gql`
        {
            testimonials {
                id
                name
                occupation
                testimonial
            }
        }
    `;

const ApiTestimonial = () => {
    const [editing, setEditing] = useState(false);
     const [testimonialId, setTestimonialId] = useState('');

    const [message, setMessage] = useState("Update Testimonial");
    const queryData = useQuery(TESTIMONIALS_QUERY).data;

    const handleClick = async (e) => {
        e.preventDefault();

        await setTestimonialId(e.target.id);

        if(!editing){
            setEditing(true);
            setMessage("Cancel");

        
        } else {
            setEditing(false);
            setMessage("Update Testimonial");
        }
    }

    return (
        <>
        {editing 
        ? (
            <TestimonialApiForm testimonialId={testimonialId} handleClick={handleClick} message={message} />
        )
        : queryData && (
            <>
            {queryData.testimonials.map(testimonial => (
                <>
                <h3>{testimonial.name}</h3>
                <h3>{testimonial.occupation} </h3>
                <h4>Testimonial</h4>
                <p>{testimonial.testimonial}</p>
                <button id={testimonial.id} onClick={handleClick}>{message}</button>
                </>
            ))}
            </>
        )
        }
        </>
        
    );
};


export default ApiTestimonial;