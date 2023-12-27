import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';


const TEST_QUERY = gql`
    query testimonial($testimonialId: ID!){
        testimonial(id: $testimonialId){
            id
            name
            occupation
            testimonial
        }
    }
`;

const UPDATE_TESTIMONIAL = gql `
    mutation updateTestimonial($oldName: String!, $name: String, $occupation: String, $testimonial: String){
        updateTestimonial(oldName: $oldName, name: $name, occupation: $occupation, testimonial: $testimonial){
            id
            name
            occupation
            testimonial
        }
    }
`;

const TestimonialApiForm = ({ testimonialId, handleClick, message }) => {
    const queryData = useQuery(TEST_QUERY, {variables: {testimonialId: testimonialId} } );
    const [formState, setFormState] = useState({
        oldName: '',
        name: '',
        occupation: '',
        testimonial: '',
    });
    const [updateTestimonial, {data, loading, error}] = useMutation(UPDATE_TESTIMONIAL);
    const [testimonial, setTestimonial] = useState({});


      const handleChange = (e) => {
        e.preventDefault();

        const key = e.target.id;
        const val = e.target.value;
        setFormState({
            ...formState,
            [key]: val,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = updateTestimonial(
        {
         variables: {
            oldName: formState.oldName,
            name: formState.name,
            occupation: formState.occupation,
            testimonial: formState.testimonial,
         } ,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            } 
        }
         );

         return res;
    }



    useEffect(()=>{
        if(queryData.data){
            setTestimonial(queryData.data.testimonial);

            setFormState({
                oldName: queryData.data.testimonial.name,
                name: queryData.data.testimonial.name,
                occupation: queryData.data.testimonial.occupation,
                testimonial: queryData.data.testimonial.testimonial,
            })
        }
    }, [queryData])

       if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
         <>
        {testimonial &&
        <>
        <h2>{ testimonial.name}</h2>
          <form key={testimonial.id} className="api-form" onSubmit={handleSubmit}>

                    <label htmlFor="name">Name</label > 
                <input id="name" type="text" onChange={handleChange} placeholder={testimonial.name} value={formState.name} />


                <label htmlFor="occupation">Occupation</label> 
                <input id="occupation" type="text" cols="40" onChange={handleChange} placeholder={testimonial.occupation} value={ formState.occupation } />

                <label htmlFor="testimonial">Testimonial</label> 
                <textarea id="testimonial" type="text" cols="50" rows="10" onChange={handleChange} placeholder={testimonial.testimonial}value={ formState.testimonial} />
                
                <button type="submit" >Submit</button> 
                <button id={testimonial.id} onClick={handleClick}>{message}</button>
            </form>
            </>
            } 
        </>
    );
};

export default TestimonialApiForm;