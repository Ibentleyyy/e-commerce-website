import{Container, Row, Col, Button, Card} from 'react-bootstrap';

import ProductCard from '../components/ProductCard.js';
import { useState, useEffect } from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/products/activeProducts`)
        .then((result) => result.json())
        .then((data) => {
          setProducts(data);
        });
    }, []);

    const renderProductCards = () => {
      return products.map((product) => (
        <ProductCard key={product._id} productProp={product} />
      ));
    };

    return (
      <Container className="mt-5 products-title">
        <h1 className="text-center">Products</h1>
        <Row >{renderProductCards()}</Row>
      </Container>
    );
}