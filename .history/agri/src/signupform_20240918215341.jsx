import React from 'react'

export default function signupform() {
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
              <p>Al</p>
          </form>
    </div>
  )
}
