import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ title, content, cover, summary, createdAt, author }) => {
  return (
    <div className='post'>
      <div className='image'>
        <img src={cover} alt='alt' />
      </div>
      <div className='texts'>
        <h2>{title}</h2>
        <p className='info'>
          <Link to='/' className='author'>
            {author.username}
          </Link>
          <time>{new Date(createdAt).toLocaleString('en-US')}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
