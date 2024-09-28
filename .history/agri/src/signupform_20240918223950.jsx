import React, { useState } from 'react';
import './SignupForm.css';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered: ', user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
