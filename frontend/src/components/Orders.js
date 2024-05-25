import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://order-microservice-hwnuitb34a-ey.a.run.app/orders');
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
      const requestURL = `https://order-microservice-hwnuitb34a-ey.a.run.app/orders/${order_id}`
      const response = await axios.delete(requestURL);
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error('Error deleting order: ', error);
    }
  };



  return (
    <div className='App'>
      <br></br>
      <br></br>
      <h5>ORDERS</h5>
      <br></br>
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