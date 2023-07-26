import{Container, Row, Col, Button, Card} from 'react-bootstrap';
import UserContext from '../UserContext.js'
import { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import React from 'react';

import '../App.css';



export default function ProductCard(props){
	
	const {user} = useContext(UserContext);
	
	const {_id, name, quantity, price, description} = props.productProp;


	const [count, setCount] = useState(0);

	const [stock, setStock] = useState(quantity);

	const [isDisabled, setIsDisabled] = useState(false);



	function createOrder(){
		if (stock === 0) {
		    alert("No more stocks.");
		    return;
		}else{
			setCount(count + 1);
			setStock(stock - 1);
		}
	}



	useEffect(() => {
	if(stock === 0){
		setIsDisabled(true);
	}

	}, [stock]);



		return (
		    <Col className="mt-5 col-12 col-md-4">
		      <Card className="cardHighlight">
		      <Card.Header as="h5" className = "header">{name}</Card.Header>
		        <Card.Body>
			          <Card.Subtitle className="mb-2 text-muted">Description:</Card.Subtitle>
			          <Card.Text>{description}</Card.Text>
			          <Card.Subtitle className="mb-2 text-muted">Price:</Card.Subtitle>
			          <Card.Text className = "price">PhP {price}</Card.Text>

			          {user !== null ? 
			            <Button as={Link} to={`/products/${_id}`} className="rounded-0 details-button">
			              Details
			            </Button>
			           : 
			            <Button as={Link} to="/login">
			              Login to buy!
			            </Button>
			          }

			          

		        </Card.Body>
		      </Card>
		    </Col>
		  );
		}