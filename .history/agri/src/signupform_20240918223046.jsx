import React from 'react'
import './SignupForm.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

export default function SignupForm() {
  return (
      <div className='signup-container'>
          <form className='signup-form'>
              <h2>Sign up</h2>
              <label htmlFor="email">Email :
                  <input type='text'/>
              </label>
              <label htmlFor="password">
                  password :
                  <input type='password'/>
              </label>
              <button> Sign Up</button>
              <p>Already registered<link to="/lo">Login</link></p>
          </form>
    </div>
  )
}
