import { useMutation } from '@apollo/client';
import React, {useState, useEffect} from 'react';
import { NEW_BLOG } from '../../../Util/GraphQL';
import { useNavigate } from 'react-router-dom';
import ApiSidePanel from '../ApiSidePanel';


const AddBlogForm = ({setAdding, refetch}) => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        title: '',
        body: ''
    });
    const [newBlog, {data, loading, error}] = useMutation(NEW_BLOG);

    const loggedIn = sessionStorage.getItem('token');

    useEffect(() => {
        if(!loggedIn) {
            navigate('/api');
        }
    },[]);

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
            <ApiSidePanel loggedIn={loggedIn}/>
            <form action="submit" onSubmit={handleSubmit} className='api-form'>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" onChange={handleChange} value={formState.title} />
                <label htmlFor="body">Body</label>
                <textarea type="textarea" cols="40" rows="10" id="body" onChange={handleChange} value={formState.body}/>
                <label htmlFor="alt">Alt text for Image</label>
                <div>
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            {loading && <span>{'Loading'}</span>}
            {error && <span>{`Error: ${error.message}`}</span>}
        </React.Fragment>
    );
};

export default AddBlogForm;