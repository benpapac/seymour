import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { NEW_BLOG } from '../../../Util/GraphQL';


const AddBlogForm = ({setAdding, refetch}) => {

    const [formState, setFormState] = useState({
        title: '',
        body: ''
    });
    const [newBlog, {data, loading, error}] = useMutation(NEW_BLOG);

    const handleCancel = (e) => {
    e.preventDefault();
    setAdding(false)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await newBlog({
            variables: {
                ...formState,
                date: new Date()
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        // await refetch({});

        if(!error) {
            setAdding(false);
        }
    }


    return (
        <React.Fragment>
            <form action="submit" onSubmit={handleSubmit} className='api-form'>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" onChange={handleChange} value={formState.title} />
                <label htmlFor="body">Body</label>
                <textarea type="textarea" cols="40" rows="30" id="body" onChange={handleChange} value={formState.body}/>
                <label htmlFor="alt">Alt text for Image</label>
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
            {loading && <span>{'Loading'}</span>}
            {error && <span>{`Error: ${error.message}`}</span>}
        </React.Fragment>
    );
};

export default AddBlogForm;