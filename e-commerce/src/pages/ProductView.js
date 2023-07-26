import {useState, useEffect, useContext} from 'react';

import {useParams, useNavigate} from 'react-router-dom';

import {Container, Row, Col, Button, Card} from 'react-bootstrap';

import Swal2 from 'sweetalert2';

import UserContext from '../UserContext.js';

export default function ProductView(){
	const { user } = useContext(UserContext);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const navigate = useNavigate();

	const {productId} = useParams();
	console.log(productId);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		
		.then(result => result.json())
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setStock(data.stock);
			setCategory(data.category);

		})
	}, [])


	const handleDecreaseQuantity = () => {
	    if (quantity > 1) {
	      setQuantity(quantity - 1);
	    }
	};

	  const handleIncreaseQuantity = () => {
	    if (quantity < stock) {
	      setQuantity(quantity + 1);
	    }
	};


	const createOrder = (productId) => {
	  const totalAmount = quantity * price;

	  const orderData = {
	    id: productId,
	    name: name,
	    quantity: quantity,
	    price: price
	  };

	  fetch(`${process.env.REACT_APP_API_URL}/users/createOrder`, {
	    method: 'POST',
	    headers: {
	      'Authorization': `Bearer ${localStorage.getItem('token')}`,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(orderData)
	  })
	    .then(response => response.json())
	    .then(data => {
	      if (data) {
	        Swal2.fire({
	          title: 'Order Successful!',
	          icon: 'success',
	          text: "You have successfully purchased this product!"
	        });
	        navigate('/products');
	      } else {
	        Swal2.fire({
	          title: 'Something went wrong',
	          icon: 'error',
	          text: 'Please login to your account.'
	        });
	        navigate('/login');
	      }
	    })
	    .catch(error => {
	      console.error('Error:', error);
	    });
	};





	return(
		<Container>
			<Row>
				<Col className="mt-5 product-view-card">
					<Card>
					<Card.Header as="h5" className = "header">{name}</Card.Header>
					      <Card.Body>
					        {/*<Card.Title>{name}</Card.Title>*/}
					        <Card.Subtitle>Description:</Card.Subtitle>
					        <Card.Text>{description}</Card.Text>

					        <Card.Subtitle>Category:</Card.Subtitle>
					        <Card.Text>{category}</Card.Text>

					        <Card.Subtitle>Stock:</Card.Subtitle>
					        <Card.Text>{stock}</Card.Text>

					        <Card.Subtitle>Price:</Card.Subtitle>
					        <Card.Text className = "price">PhP {price}</Card.Text>

					        
					    {!user.isAdmin && (
					        <Card.Subtitle className="mt-5">Quantity:</Card.Subtitle>
					        )}
					        <div className="quantity-controls">
					    

					        {!user.isAdmin && (
					            <Button className="rounded-0 add-cart mt-2" onClick={handleDecreaseQuantity}>
					                -
					            </Button >
					        )}

					        {!user.isAdmin && (
					            <span className="quantity me-3 ms-3 mt-2">	{quantity}	</span>
					        )}

					        {!user.isAdmin && (
					           	<Button className="rounded-0 add-cart mt-2" onClick={handleIncreaseQuantity}>
					                +
					            </Button>
					        )}
					        </div>

					  
					        {!user.isAdmin && (
				                <Button className="rounded-0 add-cart mt-5" onClick={() => createOrder(productId)}>
				                  CHECKOUT
				                </Button>
              				)}
					      </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>


		)
}