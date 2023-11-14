import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BLOGS_QUERY, DEL_BLOG, UPDATE_BLOG } from '../../../Util/GraphQL';
import AddBlogForm from './AddBlogForm';

import './ApiBlog.css';

const ApiBlog = () => {
    const {data, refetch} = useQuery(BLOGS_QUERY);
    const [updateBlog] = useMutation(UPDATE_BLOG);
    const [deleteBlog] = useMutation(DEL_BLOG);
    const [adding, setAdding] = useState(false);
    const [formState, setFormState] = useState({
        idx: 0,
        ...data?.blogs[0]
    });

    const handleFocus = (idx) => {
        if (formState.idx !== idx) {
            setFormState({
                idx,
                ...data?.blogs[idx]
            })
        };
    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log('changing: ', e.target.id, e.target.value);
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateBlog({
            variables: {
                oldTitle: data.blogs[formState.idx].title,
                title: formState.title,
                body: formState.body
            } ,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            } 
        });

        refetch();
    }

    const handleDelete = (idx) => {
        deleteBlog({
            variables: {
                id: data?.blogs[idx].id
            }
        })
    };

    if (adding) {
        return (<AddBlogForm 
            setAdding={setAdding}
            refetch={refetch}
            />)
    };


    return (
        <div className='api-blog-container'>
            <button className="api-create-button" onClick={()=> setAdding(true)}>Create new Blog. </button>
            {data?.blogs && data.blogs.map((blog, idx) => (
                <form 
                    action="submit" 
                    onSubmit={handleUpdate}
                    id={idx}
                    key={idx}
                    className='api-blog-form'
                    onFocus={(e) => {
                        e.preventDefault();
                        handleFocus(idx)
                    }}
                >
                    <label for="title">Title</label>
                    <input 
                    type="text" 
                    id="title"
                    className='api-blog-input'
                    placeholder="What's this post about?"
                    value={formState.title}
                    />
                    <label for="body">Post</label>
                    <textarea 
                        onChange={handleChange}
                        name="body" 
                        id="body" 
                        cols="30" 
                        rows="10" 
                        className='api-blog-input'
                        placeholder='Write or paste your blog here.'
                        value={formState.body}
                    />
                    <div className='api-blog-button-group'>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDelete(idx);
                            }}>Delete</button>
                    </div>
                </form>
            ))}
        </div>
    );
};

export default ApiBlog;