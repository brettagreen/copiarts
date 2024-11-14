import Calendar from './Calendar';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext';

function Admin() {
	const admin = useContext(UserContext).admin;
	let redirect = useNavigate();

	useEffect(() => {
		function proveIt() {
			if (!admin) {
				redirect('/admin/login');
			} 
		}
		
		proveIt();
	});

	if (admin) {
		return(
			<Calendar />
		)
	} 

}

export default Admin