import {Navigate} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';

import UserContext from '../UserContext.js';

export default function Logout(){

	const {unsetUser, setUser} = useContext(UserContext);

	useEffect (() => {
		unsetUser();

		setUser({
			id: null,
			isAdmin: null
		});
	})


	return(
		<Navigate to = '/login' />

		)


}