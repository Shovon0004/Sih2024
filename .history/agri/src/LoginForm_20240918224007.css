import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in user:', user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <label htmlFor="email">Email:
          <input 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required 
          />
        </label>
        <label htmlFor="password">Password:
          <input 
            type='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required 
          />
        </label>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}
