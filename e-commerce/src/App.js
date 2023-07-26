
import './App.css';

import {useState, useEffect} from 'react'

import AppNavBar from './components/AppNavBar.js';
import NotFound from './components/NotFound.js';

import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import AdminDashboard from './pages/AdminDashboard.js';
import Product from './pages/Products.js';
import ProductView from './pages/ProductView.js';
import Orders from './pages/Orders.js';
import UserDetails from './pages/UserDetails.js'


import {UserProvider} from './UserContext.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {



  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });



  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log(user);
    console.log(localStorage.getItem('token'));
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(result => {
        if (!result.ok) {
          throw new Error('Failed to fetch user details');
        }
        return result.json();
      })
      .then(data => {
        console.log(data);
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      })
      .catch(error => console.log(error));
    }
  }, []);





  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setProducts(data);
    })
    .catch(error => console.log(error));
  }, []);




  return (
    <UserProvider value={{ user, setUser, unsetUser, products, setProducts }}>
      <BrowserRouter>
        <AppNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path = '/products' element = {<Product/>} />
            <Route path="/admindashboard" element={<AdminDashboard products={products} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path = '/products/:productId' element = {<ProductView/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </UserProvider>
    );
}

export default App;
