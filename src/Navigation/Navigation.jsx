
import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  const navigate=useNavigate()
  let  userId=localStorage.getItem("userId")
  function logout(){
    localStorage.removeItem("userId")
    navigate("/")
  }
  return (
    <div>
      {
        userId?(
          <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/add-book">Add Book</Link>
            <Link onClick={logout}>Logout</Link>           
          </div>
        ):(
          <div className='navbar'>
            <Link to="/">Home</Link>
          
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            
          </div>
        )
      }
    </div>
  )
}