import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

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
      <>
    <div className='login-container'>
      <div className="login-box">
        <div className="login-illustration">
          <img 
            src="https://th.bing.com/th/id/OIG1._h6_HMOgCsjsW2GjibJv?pid=ImgGn" 
            alt="illustration"
          />
        </div>
        <form className='login-form' onSubmit={handleLogin}>
          <h2>Welcome Back :)</h2>
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
          <div className="login-actions">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit">Login Now</button>
          <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
        </form>
      </div>
            </div>
            </>
  );
}
