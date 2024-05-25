
import React, { useState } from 'react'
import axios from 'axios'

const InsertProduct = () => {

  const [_name, setName] = useState("");
  const [_description, setDescription] = useState("")
  const [_price, setPrice] = useState(-1);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const requestBody = { name: _name, description: _description, price: _price }
      const response = await axios.post('http://localhost:8080/products/create', requestBody)
      console.log(response.data)
    } catch (error) {
      console.log("Error inserting product: ", error)
    }
  }

  return (
    <div className='App'>
      <br></br>
      <br></br>
      <h5>INSERT PRODUCT</h5>
      <br></br>
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <label for="name">PRODUCT NAME</label>
          <input onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="name" aria-describedby="name" placeholder="Product Name" />
        </div>
        <div class="form-group">
          <label for="description">DESCRIPTION</label>
          <input onChange={(e) => setDescription(e.target.value)} type="text" class="form-control" id="description" placeholder="Description" />
        </div>
        <div class="form-group">
          <label for="price">PRICE</label>
          <input onChange={(e) => setPrice(parseInt(e.target.value))} type="number" class="form-control" id="price" placeholder="Price" />
        </div>
        <button type="submit" class="btn btn-primary">Insert Product</button>
      </form>
    </div>
  )
}

export default InsertProduct