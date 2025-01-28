import Calendar from './Calendar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
     * the useNavigate object allows for programmatic site navigation.
     * @see https://reactrouter.com/en/6.22.3/hooks/use-navigate
     * @type {Object}
     */
	let redirect = useNavigate();

	if (sessionStorage.getItem('admin')) {
		return(
			<Calendar />
		)
	} else {
		redirect('/admin/login');
	}

}

export default Admin