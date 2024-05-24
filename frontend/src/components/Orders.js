import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:9090/orders');
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

  }, []);

  const deleteorder = async (order_id) => {
    try {
      const requestURL = `http://localhost:9090/Orders/${order_id}`
      const response = await axios.delete(requestURL);
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error('Error deleting order: ', error);
    }
  };



  return (
    <div className='App'>
      <h5>Orders</h5>
      <table class="table">

        <thead>
          <tr>
            <th scope="col">ID</th>

            <th scope="col">Username</th>

            <th scope="col">Total Price</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>{order.user}</td>


              <td>{order.total_price}</td>

              <td><button className='btn btn-danger' onClick={() => deleteorder(order._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders