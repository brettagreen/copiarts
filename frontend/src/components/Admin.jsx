import Calendar from './Calendar';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext';

/**
 * @component /frontend/src/components/Admin
 * @requires module:/frontend/src/components/Calendar
 * @requires module:react-router-dom.useNavigate
 * @requires module:react.useContext
 * @requires module:react.useEffect
 * 
 * 
 * @description Footer component. used at the bottom of all pages. holds some relevant links and looks pretty
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - redirection to Login component if authentication is a failure. otherwise, returns Calendar component
 *
 */
function Admin() {

	/**
	 * @type {boolean} - is user an admin or not
	 */
	const admin = useContext(UserContext).admin;
	console.log("admin", admin);

    /**
     * the useNavigate object allows for programmatic site navigation.
     * @see https://reactrouter.com/en/6.22.3/hooks/use-navigate
     * @type {Object}
     */
	let redirect = useNavigate();

	useEffect(() => {
        /**
         * show use the proverbial door - lmao - back to the Login componet if their password is bogus
         * @async
         * @returns {undefined} 
         */
		function proveIt() {
			if (!admin) {
				redirect('/admin/login');
			} 
		}
		console.log("useEffect admin", admin);
		proveIt();
	});

	if (admin) {
		return(
			<Calendar />
		)
	} 

}

export default Admin