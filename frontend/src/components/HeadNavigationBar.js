import React from 'react'

const HeadNavigationBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">E-Commerce Web</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="products">Products</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="users">Users</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="orders">Orders</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="insert-product">Insert Product</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="insert-user">Insert User</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HeadNavigationBar
