import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (request.status === 201) {
      console.log('registration succeded !!!');
    } else {
      console.error(`${request.status} ${request.statusText}`);
    }
    console.log('form submit ', JSON.stringify({ username, password }));
  };

  console.log({ username, password });
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
