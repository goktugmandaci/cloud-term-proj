import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart_products, setCartProducts] = useState([]);
  const [cart_product_ids, setCartProductIDs] = useState([]);
  const [_username, setUsername] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://product-microservice-hwnuitb34a-ey.a.run.app/products');
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

  }, []);

  const addToCart = async (product) => {
    try {
      setCartProducts([...cart_products, product])
      setCartProductIDs([...cart_product_ids, product._id])
    } catch (error) {
      console.error('Error adding to cart: ', error);
    }
  }

  const clearCart = async () => {
    setCartProducts([])
    setCartProductIDs([])
  }

  const buy = async (_products) => {
    try {
      console.log(_products)
      const requestBody = { products: _products, username: _username || "web-browser" }
      const response = await axios.post('https://order-microservice-hwnuitb34a-ey.a.run.app/orders/create', requestBody);
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error('Error creating order: ', error);
    }
  }

  const deleteProduct = async (product_id) => {
    try {
      const requestURL = `https://product-microservice-hwnuitb34a-ey.a.run.app/products/${product_id}`
      const response = await axios.delete(requestURL);
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  }

  return (
    <div className='App'>
      <br></br>
      <br></br>
      <h5>CART</h5>
      <br></br>
      <table className='table'>
        {cart_products.map(product => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
          </tr>

        ))}

      </table>
      <div>
        <button className="btn btn-primary mr-2" onClick={() => buy(cart_products)}>Buy</button>
        <button className="btn btn-danger" onClick={() => clearCart()}>Clear</button>
      </div>
      <br></br>
      <div >
        <label for="username">USERNAME</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" id="username" aria-describedby="username" placeholder="" />
      </div>
      <br></br>
      <h5>PRODUCTS</h5>
      <br></br>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>

            <th scope="col">Price</th>

            <th scope="col">Description</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>{product.price}</td>


              <td>{product.description}</td>
              <td>
                <button className='btn btn-primary mr-2' onClick={() => addToCart(product)}>Add To Cart</button>
                <button className='btn btn-danger' onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
