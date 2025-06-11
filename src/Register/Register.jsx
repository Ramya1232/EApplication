import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  function register(e) {
    e.preventDefault()
    axios.post("http://localhost:5000/api/auth/register", { name, email, password, mobile })
      .then((res) => {
        console.log(res)
      })
      .catch((err)=>{
        if(err.status==400){
          alert("User already exists")}
        else{
          alert("internal server error")
        }
      })
  }
  return (
    <div className='color'>
    <div className='container mt-4'>
      <div className="row">
        <form onSubmit={register} className='col-6'>
          <div class="mb-3">
            <label for="exampleInputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleInputName" onChange={(e) => setName(e.target.value)} />

          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="text" class="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPhoneNumber" class="form-label">Phone Number</label>
            <input type="number" class="form-control" onChange={(e) => setMobile(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
      </div>

    </div>
  )
}