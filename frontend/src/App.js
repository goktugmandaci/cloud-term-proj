import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeadNavigationBar from './components/HeadNavigationBar';
import InsertProduct from './components/InsertProduct';
import InsertUser from './components/InsertUser';
import Products from './components/Products';
import Users from './components/Users';
import Orders from './components/Orders';

function App() {
  return (
    <Router>
      <div className="App">
        <HeadNavigationBar></HeadNavigationBar>
      </div>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/insert/user" element={<InsertUser />} />
        <Route path="/insert/product" element={<InsertProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
