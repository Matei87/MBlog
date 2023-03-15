import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, cover, summary, createdAt, author }) => {
  return (
    <div className='post'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img src={`/${cover}`} alt='alt' />
        </Link>
      </div>
      <div className='texts'>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
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
