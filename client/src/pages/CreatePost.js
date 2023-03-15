import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file[0]);
    console.log('data ', data, file[0]);
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
        <ReactQuill
          theme='snow'
          value={content}
          modules={modules}
          formats={formats}
          onChange={setContent}
        />
        <button type='submit' style={{ marginTop: '5px' }}>
          Create post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
