import React from 'react'
import SignupForm from './SignupForm';  // Correct component name


import './App.css'
import { BrowserRouter, Route } from 'react-router-dom';
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Route>
          <Route path='/signup' element={<SignupForm/>}></Route>
        </Route>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
