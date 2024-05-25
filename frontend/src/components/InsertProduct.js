
import React, { useState } from 'react'
import axios from 'axios'

const InsertProduct = () => {

  const [_name, setName] = useState("");
  const [_desription, setDescription] = useState("")
  const [_price, setPrice] = useState(-1);

  const submitHandler = async () => {
    e.preventDefault()
    try {
      const requestBody = { name: _name, description: _desription, price: _price }
      const response = await axios.post('http://localhost:8080/products/create', requestBody)
      console.log(response.data)
      window.location.reload()
    } catch (error) {
      console.log("Error inserting product: ", error)
    }
  }

  return (
    <div className='App'>
      <form onSubmit={() => submitHandler()}>
        <div class="form-group">
          <label for="name">Product Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="name" aria-describedby="name" placeholder="Product Name" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input onChange={(e) => setDescription(e.target.value)} type="text" class="form-control" id="description" placeholder="Description" />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input onChange={(e) => setPrice(parseInt(e.target.value))} type="number" class="form-control" id="price" placeholder="Price" />
        </div>
        <button type="submit" class="btn btn-primary">Insert product</button>
      </form>
    </div>
  )
}

export default InsertProduct