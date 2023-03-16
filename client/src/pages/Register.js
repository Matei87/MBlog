import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (request.status === 201) {
      setIsRegistered(true);
    } else {
      console.error(`${request.status} ${request.statusText}`);
    }
  };

  if (isRegistered) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='register'>
      <h1>Register</h1>
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
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
