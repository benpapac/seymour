import React, { useContext } from 'react';
import { Context } from '../../Util/Context';
import BlogPost from './BlogPost';
import BackButton from '../Back/BackButton';

import './Blog.css';

const Blog = () => {
    const {blogsData} = useContext(Context);

    if(!blogsData){
        return  <div className='loading-page'>
                    <h1 id='loading-message'>Loading...</h1>
                </div>
    };

    return ( blogsData && 
        <React.Fragment>
            { blogsData.map((blog, idx) => 
                <BlogPost blog={blog} key={idx}/>
            )}

            <BackButton />
        </React.Fragment>
    );
};

export default Blog;