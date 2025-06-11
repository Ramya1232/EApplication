import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register/Register'
import Navigation from './Navigation/Navigation'
import Login from './Login/Login'
import Home from './Home/Home'
import Addbook from './Addbook/Addbook'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="add-book" element={<Addbook/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  )
}
