import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import React, {useState, useEffect, useContext} from 'react';

import {Navigate, Link, useNavigate} from 'react-router-dom';

import Swal2 from 'sweetalert2';

import UserContext from '../UserContext.js';

import NotFound from '../components/NotFound.js';



export default function Login(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const {user, setUser} = useContext(UserContext);

	const [isDisabled, setIsDisabled] = useState(true);

	const navigate = useNavigate();

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(data => {
			console.log(data);
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	
	useEffect(()=>{
		if (email !== '' && password !==''){

			setIsDisabled(false);

		}else{
			setIsDisabled(true);
		}


	}, [email, password]);

	
	function login(event){
		
		event.preventDefault()
	
		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		    email: email,
		    password: password,
		  })
		})

		.then (result => result.json())
		.then  (data => {
			if(data === false){
				
				Swal2.fire({
					title : 'Authentication Failed!',
					icon : 'error',
					text : 'Check your login details and try again!'
				})
			}else{
				// alert('Login Successful!');
				localStorage.setItem('token', data.auth);
				retrieveUserDetails(data.auth);

				Swal2.fire({
					title : 'Login successful',
					icon : 'success',
					text : 'Welcome to NEPHO_!'
				})

				navigate('/')

			}
		})




		setEmail('');
		setPassword('');
	}

if (user.id !== null) {

	
    return <NotFound />; 
  }

  return (


	(user.id === null) ?
	<Container className = 'mt-5'>
		<Row>
			<Col className = 'col-6 mx-auto'>
				<h1 className = 'text-center mt-5'>LOGIN</h1>
				<p className = 'text-center mt-5 mb-3' >Please enter your e-mail and password:</p>
				<Form onSubmit = {event => login(event)}>
				      <Form.Group className="mb-3" controlId="formBasicEmail">
				        
				        <Form.Control 
				        	type="email" 
				        	value = {email}
				        	onChange = {event => {
				        		setEmail(event.target.value)
				        	}}
				        	placeholder="Email" 
				        	className = "rounded-0 custom-input" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        
				        <Form.Control 
				        	type="password" 
				        	value = {password}
				        	onChange = {event => setPassword(event.target.value)}
				        	placeholder = "Password"
				        	className = "rounded-0 custom-input" />
				      </Form.Group>

				      <Button variant="dark" type="submit"
				      		disabled = {isDisabled} className="w-100 rounded-0">
				        LOGIN
				      </Button>

				      <p className = 'text-center mt-2' >Don't have an account? <Link to = '/register'>Create one</Link></p>
				    </Form>

			</Col>
		</Row>
	</Container>

	:

	<Navigate to = '/' />
	
	
	)
}