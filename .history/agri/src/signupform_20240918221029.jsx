import React from 'react'
import './SignupForm.css'
impoe

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
              <p>Already registered<a>Login</a></p>
          </form>
    </div>
  )
}
