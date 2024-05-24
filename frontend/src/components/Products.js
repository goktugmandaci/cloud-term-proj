import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart_products, setCartProducts] = useState([]);
  const [cart_product_ids, setCartProductIDs] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
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
      const requestBody = { products: _products, username: "web-browser" }
      const response = await axios.post('http://localhost:9090/orders/create', requestBody);
      console.log(response)
    } catch (error) {
      console.error('Error creating order: ', error);
    }
  }
  return (
    <div className='App'>
      <br></br>
      <h5>CART</h5>
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
      <h5>Products</h5>
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

              <td><button className='btn btn-primary mr-2' onClick={() => addToCart(product)}>Add To Cart</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
