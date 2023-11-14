import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { BLOGS_QUERY } from '../../Util/GraphQL';
import { Context } from '../../Util/Context';

import './Blog.css';

const Blog = () => {
    const {blogsData} = useContext(Context);

    console.log('blogs: ', blogsData);

    return (
        <div className='blog-container'>
            <h3>This page is under construction 🔧
            Come back soon!</h3>

            { blogsData && blogsData.map((blog, idx) => (
                <div>
                    <h4>{blog.title}</h4>
                    <p>{blog.body}</p>
                    <h6>{blog.date}</h6>
                </div>
            ))}
        </div>
    );
};

export default Blog;