
import React, { useState } from 'react'
import axios from 'axios'

const InsertUser = () => {

  const [_username, setUsername] = useState("");
  const [_email, setEmail] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const requestBody = { name: _username, email: _email }
      const response = await axios.post('https://auth-microservice-hwnuitb34a-ey.a.run.app/users/create', requestBody)
      console.log(response.data)
    } catch (error) {
      console.log("Error inserting user: ", error)
    }
  }

  return (
    <div className='App'>
      <br></br>
      <br></br>
      <h5>INSERT USER</h5>
      <br></br>
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <label for="username">USERNAME</label>
          <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" id="username" aria-describedby="username" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" class="form-control" id="email" placeholder="Email" />
        </div>
        <button type="submit" class="btn btn-primary">Insert User</button>
      </form>
    </div>
  )
}

export default InsertUser