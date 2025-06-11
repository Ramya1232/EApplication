import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
export default function Login() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  function login(e) {
    e.preventDefault()
    axios.post("http://localhost:5000/api/auth/login", { email, password })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          alert("login successful")
          localStorage.setItem("userId", res.data.userId)
          navigate("/")
        }
      })
  }
  return (
    <div className='color'>
  
      <div className='container mt-5'>
        <div className='row'>
          <form className='col-6' onSubmit={login}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

      </div>

    </div>
    </div>
  )
}