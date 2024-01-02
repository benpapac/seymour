import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BLOGS_QUERY, DEL_BLOG, UPDATE_BLOG } from '../../../Util/GraphQL';
import AddBlogForm from './AddBlogForm';
import { useNavigate } from 'react-router-dom';

import './ApiBlog.css';
import ApiSidePanel from '../ApiSidePanel';

const ApiBlog = () => {
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('token');
    if (!loggedIn) {
        navigate('/api');
    };


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

    console.log(data);

    if (adding) {
        return (<AddBlogForm 
            setAdding={setAdding}
            refetch={refetch}
            />)
    };


    return (
        <React.Fragment>
            <ApiSidePanel loggedIn={loggedIn}/>
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
                        placeholder={blog.title}
                        onChange={handleChange}
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
                            placeholder={blog.body}
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
        </React.Fragment>
    );
};

export default ApiBlog;