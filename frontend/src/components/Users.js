import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://auth-microservice-hwnuitb34a-ey.a.run.app/users');
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

  }, []);

  const deleteUser = async (user_id) => {
    try {
      const requestURL = `https://auth-microservice-hwnuitb34a-ey.a.run.app/${user_id}`
      const response = await axios.delete(requestURL);
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };



  return (
    <div className='App'>
      <br></br>
      <br></br>
      <h5>USERS</h5>
      <br></br>
      <table class="table">

        <thead>
          <tr>
            <th scope="col">ID</th>

            <th scope="col">Username</th>

            <th scope="col">Email</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>

              <td>{user.name}</td>


              <td>{user.email}</td>

              <td><button className='btn btn-danger' onClick={() => deleteUser(user._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users