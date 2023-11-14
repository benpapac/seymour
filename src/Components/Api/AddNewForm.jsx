import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { NEW_ACTOR, NEW_BLOG, NEW_TESTIMONIAL } from '../../Util/GraphQL';
import AddActorForm from './ApiActor/AddActorForm';
import AddBlogForm from './ApiBlog/AddBlogForm';
import AddTestimonialForm from './ApiTestimonial/AddTestimonialForm';


const getItemType = (itemType) => {
    switch(itemType) {
        case 'actor' :
            return NEW_ACTOR;
        case 'blog': 
            return NEW_BLOG;
        case 'testimonial':
            return NEW_TESTIMONIAL
        default:
            break;
    }
};


const AddNewForm = ({itemType}) => {
    const [newItem, {data, loading, error}] = useMutation(getItemType(itemType));
    const [submitted, setSubmitted] = useState(false);
    const [formState, setFormState] = useState({});
    const navigate = useNavigate();
    
    const getEntityAddForm = () => {
        switch(itemType) {
            case 'actor' :
                return <AddActorForm
                    formState={formState}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />;
            case 'blog': 
                return <AddBlogForm
                    formState={formState}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />;
            case 'testimonial':
                return <AddTestimonialForm
                    formState={formState}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />;
            default:
                break;
        }
    };


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
            date: new Date()
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
        <React.Fragment>
            {getEntityAddForm()}
        </React.Fragment>
    );
};

export default AddNewForm;