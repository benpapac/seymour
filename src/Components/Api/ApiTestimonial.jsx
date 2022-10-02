
import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import TestimonialApiForm from './TestimonialApiForm';
import AddNewForm from './AddNewForm';
import { useNavigate } from 'react-router-dom';

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

      const DEL_TESTIMONIAL = gql `
    mutation deleteTestimonial($name: String!){
        deleteTestimonial(name: $name){
            id
            name
            occupation
            testimonial
        }
    }
    `;

const ApiTestimonial = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
     const [testimonialId, setTestimonialId] = useState('');
     const [deleteTestimonial, {data, loading, error}] = useMutation(DEL_TESTIMONIAL);

    const [message, setMessage] = useState("Update this Testimonial");
    const queryData = useQuery(TESTIMONIALS_QUERY).data;
    const [newItem, setNewItem] = useState(false);


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

       const handleDelete= (name) => {

        const res = deleteTestimonial({variables: {name: name}});
        console.log(res);
    }

    useEffect(()=>{
    if( !sessionStorage.getItem('token') ) navigate('/api');
})

    if(loading) return 'Submitting...';
    if(error) return `Error: ${error.message}`;

    return (
        <>
        <button className="api-create-button" onClick={()=> setNewItem(true)}>Create new Testimonial. </button>
        {!newItem ? null : <AddNewForm itemType="testimonial" />}
        {editing 
        ? (
            <TestimonialApiForm testimonialId={testimonialId} handleClick={handleClick} message={message} />
        )
        : queryData && (
            <>
            {queryData.testimonials.map(testimonial => (
                <div className='api-div'>
                <h3>{testimonial.name}</h3>
                <h3>{testimonial.occupation} </h3>
                <h4>Testimonial</h4>
                <p>{testimonial.testimonial}</p>
                
                <div className="api-div-buttons" >
                <button id={testimonial.id} onClick={handleClick}>{message}</button>
                 <button onClick={() => handleDelete(testimonial.name)}>Delete this Testimonial</button>
                </div>

                </div>
            ))}
            </>
        )
        }
        </>
        
    );
};


export default ApiTestimonial;