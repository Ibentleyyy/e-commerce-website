import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import {useState, useEffect, useContext} from 'react';

import UserContext from '../UserContext.js'

import {Link, useNavigate} from 'react-router-dom';

import NotFound from '../components/NotFound.js';

import Swal2 from 'sweetalert2';

export default function Register(){
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [retypePassword, setRetypePassword] = useState('');

	const {user, setUser} = useContext (UserContext);

	const navigate = useNavigate();

	const [isDisabled, setIsDisabled] = useState(true);


	useEffect(()=>{
		if (firstName !== '' && lastName !== '' && email !== '' && password !=='' && retypePassword !== '' && password === retypePassword){

			setIsDisabled(false);

		}else{
			setIsDisabled(true);
		}

	}, [firstName, lastName, email, password, retypePassword]);


	
	function register(event){
		
		event.preventDefault()
		console.log(user)

		fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		      },
		      body: JSON.stringify({
		        firstName: firstName,
		        lastName: lastName,
		        email: email,
		        password: password,
		        retypePassword: retypePassword,
		      }),
		    })
		      .then(result => result.json())
		        .then(data => {
		          console.log(data);
		          if (data === false) {
		            Swal2.fire({
		              title: 'Registration Failed!',
		              icon: 'error',
		              text: 'Email has been taken! Try registering with a different email!',
		            });
		          } else {
		            
		            Swal2.fire({
		              title: 'Registration Successful!',
		              icon: 'success',
		              text: 'Welcome to Alapaap_!',
		            });
		            navigate('/login');
		          }
		        });
		            

		//clear input fields
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setRetypePassword('');
	}

if (user.id !== null) {
	 return <NotFound />; 
  }
 
  return (
	<Container className = 'mt-5'>
		<Row>
			<Col className = 'col-6 mx-auto'>
				<h1 className = 'text-center mt-5'>REGISTER</h1>
				<p className = 'text-center mt-5 mb-3' >Please fill in the information below:</p>
				<Form onSubmit = {event => register(event)}>
					  <Form.Group className="mb-3" controlId="formBasicFirstName">
					    <Form.Control
					      type="text"
					      value={firstName}
					      onChange={event => setFirstName(event.target.value)}
					      placeholder="First Name"
					      className = "rounded-0 custom-input"
					    />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicLastName">
					    <Form.Control
					      type="text"
					      value={lastName}
					      onChange={event => setLastName(event.target.value)}
					      placeholder="Last Name"
					      className = "rounded-0 custom-input"
					    />
					  </Form.Group>

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

				      <Form.Group className="mb-3" controlId="formBasicPassword1">
				        
				        <Form.Control 
				        	type="password" 
				        	value = {password}
				        	onChange = {event => setPassword(event.target.value)}
				        	placeholder="Password" 
				        	className = "rounded-0 custom-input" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword2">
				        
				        <Form.Control 
				        	type="password" 
				        	value = {retypePassword}
				        	onChange = {event => setRetypePassword(event.target.value)}
				        	placeholder="Retype password"
				        	className = "rounded-0 custom-input" />
				      </Form.Group>

				      <Button variant="dark" type="submit"
				      		disabled = {isDisabled} className="w-100 rounded-0">
				        Submit
				      </Button>

				      <p className = 'text-center mt-2'>Already registered? <Link to = '/login'>Login here</Link></p>

				      
				    </Form>

			</Col>
		</Row>
	</Container>

	)
}