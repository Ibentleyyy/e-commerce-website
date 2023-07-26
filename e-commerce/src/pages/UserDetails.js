import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import '../App.css';

const UserDetails = () => {
  const [details, setDetails] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setDetails([data]);
        setUserInfo(data); 
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
    {userInfo && (
        <h2 className="welcome-message mt-5">
          Welcome back, {userInfo.firstName}!
        </h2>
      )}
      <h1 className="text-center order-title">My Orders</h1>
      
      <div className="orders text-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="orders-header">Email</th>
              <th className="orders-header">Product ID</th>
              <th className="orders-header">Product Name</th>
              <th className="orders-header">Quantity</th>
              <th className="orders-header">Total Amount</th>
              <th className="orders-header">Purchased On</th>
              <th className="orders-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              detail.orderedProducts.map((userOrder, detailIndex) => (
                <tr key={userOrder._id}>
                  {detailIndex === 0 && (
                    <td rowSpan={detail.orderedProducts.length}>{detail.email}</td>
                  )}
                  <td>{userOrder.products.productId}</td>
                  <td>{userOrder.products.productName}</td>
                  <td>{userOrder.products.quantity}</td>
                  <td>{userOrder.totalAmount}</td>
                  <td>{userOrder.purchasedOn}</td>
                  <td>{userOrder.status}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UserDetails;
