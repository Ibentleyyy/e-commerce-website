import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';

import '../App.css';


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/allOrders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
    <h1 className="text-center mt-5 order-title">All Orders</h1>
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
          {orders.map((order, index) => (
            order.orderedProducts.map((productOrder, orderIndex) => (
              <tr key={productOrder._id}>
                {orderIndex === 0 && (
                  <td rowSpan={order.orderedProducts.length}>{order.email}</td>
                )}
                <td>{productOrder.products.productId}</td>
                <td>{productOrder.products.productName}</td>
                <td>{productOrder.products.quantity}</td>
                <td>{productOrder.totalAmount}</td>
                <td>{productOrder.purchasedOn}</td>
                <td>{productOrder.status}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
      </div>
    </Container>
  );
};

export default Orders;
