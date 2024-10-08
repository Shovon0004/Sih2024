import React, { useState } from 'react';
import { auth } from './firebase'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css'; // Assuming similar styles like in LoginForm.css

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered: ', user);
        navigate('/home'); 
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className='signup-container'>
      <div className="signup-box">
        <div className="signup-illustration">
          <img 
            src="https://th.bing.com/th/id/OIG1._h6_HMOgCsjsW2GjibJv?pid=ImgGn" 
            alt="illustration"
          />
        </div>
        <form className='signup-form' onSubmit={handleSignup}>
          <h2>Create an Account</h2>
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
          <button type="submit">Sign Up</button>
          <p>Already registered? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
