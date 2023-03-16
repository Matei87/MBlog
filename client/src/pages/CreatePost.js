import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file[0]);
    const req = await fetch('/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (req.status === 201) {
      setRedirect(true);
    } else {
      console.error(`${req.status} ${req.statusText}`);
    }
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <h1>Create Post</h1>
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
          Create post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
