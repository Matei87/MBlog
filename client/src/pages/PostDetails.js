import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../state/UserContext';
import { Link } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const getPostById = async () => {
      try {
        const request = await fetch(`/post/${id}`);
        const response = await request.json();
        setIsLoading(false);
        setPostInfo(response);
      } catch (error) {
        console.log(error);
      }
    };
    getPostById();
  }, [id]);

  if (!isLoading && !Object.keys(postInfo).includes('author')) {
    return <h1>No Data!</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{new Date(postInfo.createdAt).toLocaleString('en-US')}</time>
      <div className='author'>by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className='edit-row'>
          <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            Edit post
          </Link>
        </div>
      )}
      <div className='image'>
        <img src={`/${postInfo.cover}`} alt='alt' />
      </div>
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostDetails;
