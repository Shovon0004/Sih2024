import React from 'react'
import SignupForm from './SignupForm';  // Correct component name


import './App.css'
import { BrowserRouter, Route } from 'react-router-dom';
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Route>
          <Route path='/signup' element={}
        </Route>
      </BrowserRouter>
      <SignupForm/>
      
    </>
  )
}

export default App
