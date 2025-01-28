
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, TextField, Button, ThemeProvider, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CopiartsApi from '../api';
import { formTheme } from '../css/styles';
import '../css/Login.css';

/**
 * @component /frontend/src/components/Login
 * @requires module:react.useEffect
 * @requires module:react.useState
 * @requires module:react.useContext
 * @requires module:react-router-dom/useNavigate
 * @requires module:mui/material/FormControl
 * @requires module:mui/material/TextField
 * @requires module:mui/material/Button
 * @requires module:mui/material/ThemeProvider
 * @requires module:mui/material/InputAdornment
 * @requires module:mui/material/IconButton
 * @requires module:mui/icons-material/VisibilityOutlined
 * @requires module:mui/icons-material/VisibilityOffIcon
 * @requires module:mui/frontend/src/api
 * @requires module:/frontend/src/css/styles/formTheme
 * @requires module:/frontend/src/UserContext
 * @description Login component. allows for admin login. not for use for anything else.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} error message if login is unsucessful. otherwise, redirects user appropriately.
 *
 */
function Login() {

    /**
     * the useNavigate object allows for programmatic site navigation.
     * @see https://reactrouter.com/6.22.3/hooks/use-navigate
     * @type {Object}
     */
    const redirect = useNavigate();

    /**
     * @const
     * password form object
     */
    const INITIAL_STATE = {
        password: ''
    }

    const [success, setSuccess] = useState(false);

	/**
     * @typedef {Object} controlShow1 - useState hook.
     * @property {boolean} show1 - show password in cleartext or not?
     * @property {function} setShow1 - set whether or not to show cleartext
     */
    /**
     * @type {controlShow1}
     */
    const [show1, setShow1] = useState(false);

    //buncha fancy stuff to control whether password is shown in cleartext or not
    const pwIcon1 = { endAdornment: <InputAdornment position="end"><IconButton onMouseOver={() => setShow1(true)}
                        onMouseLeave={() => setShow1(false)}>{show1?<VisibilityOutlinedIcon />
                        :<VisibilityOffIcon />}</IconButton></InputAdornment> };

	/**
     * @typedef {Object} controlForm - useState hook.
     * @property {boolean} form - password field value
     * @property {function} setForm- set password field value
     */
    /**
     * @type {controlForm}
     */
    const [form, setForm] = useState(INITIAL_STATE);

	/**
     * @typedef {Object} controlError - useState hook.
     * @property {boolean} error - display error if there's something wrong with the value entered in the password field
     * @property {function} setError - set whether error should be displayed or not
     */
    /**
     * @type {controlError}
     */
    const [error, setError] = useState(null);

    /**
	 *controlled password form logic
     * @param {Object} event - keyboard change event, in this case
     * @returns {undefined}
     */
    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }

    /**
	 * form submission event
     * @param {Object} event - form submission event
     * @returns {undefined} - successful submission redirects user to appropriate page. failure shows error msg.
     */
    async function submitAndClear(event) {
        event.preventDefault();

        try {
            await CopiartsApi.loginAdmin(form);
            sessionStorage.setItem('admin', true);
            setSuccess(true);
            setForm(INITIAL_STATE);
        } catch (error) {
            setError(error);
            setForm(INITIAL_STATE);
        }
    }

    useEffect(() => {
        /**
         * if form submission is deemed a success, then user is redirected appropriately. if not, user stays on page.
         * @returns {undefined} - redirects user to Calendar page/component
         */
        function goToCalendar() {
            redirect('/admin/calendar');
        }

        console.log('ssadmin', sessionStorage.getItem('admin'));
        if (sessionStorage.getItem('admin') || success) {
            goToCalendar();
        }
    });

    return (
        <>
            <div className="PageHeader">
                <h3>Are you an admin? Prove it!</h3>
            </div>

            <ThemeProvider theme={formTheme}>
                <div id="loginformwrapper">
                    <form id="loginForm" autoComplete="off" encType="multipart/form-data" onSubmit={submitAndClear}> 
                        <FormControl margin="normal">
                            <TextField type={show1?"text":"password"} label="password" name="password" value={form.password} onChange={handleChange}
                                        InputProps={pwIcon1} />
                            <Button id="loginbutton" type="submit" variant="outlined">Submit</Button>
                        </FormControl>
                    </form>
                </div>
            </ThemeProvider>
            {error && <h1>{error} please try again.</h1>}
        </>
    )

}

export default Login;
