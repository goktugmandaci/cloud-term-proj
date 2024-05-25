
import React, { useState } from 'react'
import axios from 'axios'

const InsertUser = () => {

  const [_username, setUsername] = useState("");
  const [_email, setEmail] = useState("")

  const submitHandler = async () => {
    e.preventDefault()
    try {
      const requestBody = { username: _username, email: _email }
      const response = await axios.post('http://localhost:7070/users/create', requestBody)
      console.log(response.data)
      window.location.reload()
    } catch (error) {
      console.log("Error inserting user: ", error)
    }
  }

  return (
    <div className='App'>
      <form onSubmit={() => submitHandler()}>
        <div class="form-group">
          <label for="username">Username</label>
          <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" id="username" aria-describedby="username" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" class="form-control" id="email" placeholder="Email" />
        </div>
        <button type="submit" class="btn btn-primary">Insert User</button>
      </form>
    </div>
  )
}

export default InsertUser