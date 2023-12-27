import React from 'react';

const BlogPost = ({blog}) =>  (
         <div className={'blog-post'}>
            <h4>{blog.title}</h4>
            <p>{blog.body}</p>
            <h6>{blog.date}</h6>
        </div>
);

export default BlogPost;