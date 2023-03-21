import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../state/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (request.status === 200) {
      const data = await request.json();
      setUserInfo(data);
      setRedirect(true);
    } else {
      setIsError(true);
      console.log(`${request.status} ${request.statusText}`);
    }
  };

  if (redirect) {
    return <Navigate to='/' />;
  }
  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter username...'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password...'
        />
        <button type='submit'>Login</button>
      </form>
      {isError && <small>Invalid Credentials !</small>}
    </div>
  );
};

export default Login;
