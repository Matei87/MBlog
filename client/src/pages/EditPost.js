import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const request = await fetch(`/post/${id}`);
        const response = await request.json();
        console.log(response);
        setTitle(response.title);
        setSummary(response.summary);
        setContent(response.content);
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (file?.[0]) {
      data.set('file', file?.[0]);
    }
    console.log('data ', data, file[0]);
    const req = await fetch(`/post`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (req.status === 200) {
      setRedirect(true);
    } else {
      console.error(`${req.status} ${req.statusText}`);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Summary'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type='file'
          accept='.png, .jpeg, .jpg'
          onChange={(e) => setFile(e.target.files)}
        />
        <Editor content={content} onChange={setContent} />
        <button type='submit' style={{ marginTop: '5px' }}>
          Update post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
