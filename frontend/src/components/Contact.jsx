/**
 * @typedef {Object} form - feedback form! 
 * @property {string} nameFirst 
 * @property {string} nameLast
 * @property {string} email
 * @property {string} comment
 * 
*/

import { useState } from 'react';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { ThemeProvider } from '@mui/material';
import CopiartsApi from '../api';
import { formTheme, textareaTheme } from '../css/styles';
import '../css/Contact.css';

/**
 * @component /frontend/src/components/Contact
 * @requires module:react.useState
 * @requires module:mui/icons-material/Feedback
 * @requires module:mui/material/Alert
 * @requires module:mui/material/AlertTitle
 * @requires module:mui/material/TextField
 * @requires module:mui/material/FormControl
 * @requires module:mui/material/Button
 * @requires module:mui/material/FormHelperText
 * @requires module:mui/material/ThemeProvider
 * @requires module:mui/material/FormControl
 * @requires module:mui/frontend/src/api
 * @requires module:mui/frontend/src/css/styles/formTheme
 * @requires module:mui/frontend/src/css/styles/textareaTheme
 * @description Contact form component. form for entering and submitting.........feedback!
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} contact form. returns an Alert indicating succesful submission (or error msg)
 *
 */
function Contact() {

    /**
     * @const
     * form object
     */
    const INIT_STATE = { nameFirst: '', nameLast: '', email: '', comment: '' }

	/**
	 * 
	 * @typedef {controlForm} - useState hook. form state and set form state
	 * @property {form} form - feedback form object
	 * @property {function} setForm - controlled form object. sets values of form object on any change
	 * 
	 */
    /**
     * @type {controlForm}
     */
    const [form, setForm] = useState(INIT_STATE);

	/**
	 * 
	 * @typedef {controlCharCount} - useState hook. charCount state and set charCount state 
	 * @property {number} charCount - number of characters 
	 * @property {function} setCharCount - set number of characters entered
	 * 
	 */
    /**
     * @type {controlCharCount}
     */
    const [charCount, setCharCount] = useState(0);

	/**
	 * 
	 * @typedef {controlNameFirstError} - useState hook. first name field error? and set such state
	 * @property {boolean} showNameFirstError - error in first name field?
	 * @property {function} setShowNameFirstError - set error for first name field
	 * 
	 */
    /**
     * @type {controlNameFirstError}
     */
    const [showNameFirstError, setShowNameFirstError] = useState(false);

	/**
	 * 
	 * @typedef {controlNameLastError} - useState hook. last name field error? and set such state
	 * @property {boolean} showNameLastError - error in last name field?
	 * @property {function} setShowNameLastError - set error for last name field
	 * 
	 */
    /**
     * @type {controlNameLastError}
     */
	const [showNameLastError, setShowNameLastError] = useState(false);

	/**
	 * 
	 * @typedef {controlEmailError} - useState hook. email field error? and set such state
	 * @property {boolean} showEmailError - error in email field?
	 * @property {function} setShowEmailError - set error for email field
	 * 
	 */
    /**
     * @type {controlEmailError}
     */
    const [showEmailError, setShowEmailError] = useState(false);

	/**
	 * 
	 * @typedef {controlCommentError} - useState hook. comment/feedback field error? and set such state
	 * @property {boolean} showCommentError - error in comment/feedback field?
	 * @property {function} setShowCommentError - set error for comment/feedback field
	 * 
	 */
    /**
     * @type {controlCommentError}
     */
    const [showCommentError, setShowCommentError] = useState(false);

	/**
	 * 
	 * @typedef {controlAlert} - useState hook. show alert or not
	 * @property {boolean} alert - true? === show that alert
	 * @property {function} setAlert - set whether alert should be shown or not
	 * 
	 */
    /**
     * @type {controlAlert}
     */
    const [alert, setAlert] = useState(null);

	/**
	 * does form validation and, if all is well, handles form submission
	 * @async
	 * @returns {<Alert>}
	 */
    async function submitAndClear(event) {
        event.preventDefault();
        let error = false;

        if (form.nameFirst.length <= 2) { 
            setShowNameFirstError(true);
			error = true;
        } else {
            setShowNameFirstError(false);
        }

		if (form.nameLast.length <= 2) { 
            setShowNameLastError(true);
			error = true;
        } else {
            setShowNameLastError(false);
        }

        if (!(/[a-zA-Z\d]*@[a-zA-Z\d]*\.[A-Za-z]{2,3}/.test(form.email) || form.email.length >= 6)) {
            setShowEmailError(true);
            error = true;
        } else {
            setShowEmailError(false);
        }

        if (charCount <= 5) {
            setShowCommentError(true)
            error = true;
        } else {
            setShowCommentError(false);
        }

        if (!error) {
            const commentForm = await CopiartsApi.postComment(form);
            setAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    We appreciate your feedback!
                </Alert>
            );
            setTimeout(() => {
                setAlert(null);
                setForm(INIT_STATE);
            }, 3000);

        }
    }

	/**
	 * updates form object on change to form field
	 * @async
	 * @returns {undefined}
	 */
    function handleChange(event) {
        if (event.target.name === 'nameFirst') {
            if (form.nameFirst.length <= 30) {
                setForm({...form, [event.target.name]: event.target.value});
            }
		} else if (event.target.name === 'nameLast') {
			if (form.nameLast.length <= 30) {
				setForm({...form, [event.target.name]: event.target.value});
			}
        } else if (event.target.name === 'comment') {
            if (form.comment.length <= 1000) {
                setCharCount(form.comment.length);
                setForm({...form, [event.target.name]: event.target.value});
            }
        } else {
            if (form.email.length <= 50) {
                setForm({...form, [event.target.name]: event.target.value});
            }
        }
    }

    return(
        <>
            <div className="PageHeader">
                <FeedbackIcon size="large" /> <h2>We'd love to hear from you!</h2> <FeedbackIcon />
            </div>
            {alert && alert}
            <ThemeProvider theme={formTheme}>
                <div className="BackdropWrapper">
                    <form autoComplete="off" noValidate encType="multipart/form-data" onSubmit={submitAndClear} style={{margin: '1em'}}> 
                        <FormControl margin="normal" sx={{width: '66%'}}>

                            <TextField type="text" required={true} label="first name" name="nameFirst" value={form.nameFirst} onChange={handleChange}
                            />
                            {showNameFirstError && 
                                <FormHelperText error={true}>Please provide a first name</FormHelperText>
                            }

							<TextField type="text" required={true} label="last name" name="nameLast" value={form.nameLast} onChange={handleChange}
                            />
                            {showNameLastError && 
                                <FormHelperText error={true}>Please provide a last name</FormHelperText>
                            }

                            <TextField type="email" required={true} label="email" name="email" value={form.email} onChange={handleChange}
                            />
                            {showEmailError && 
                                <FormHelperText error={true}>A real email address is required.</FormHelperText>
                            }

                            <ThemeProvider theme={textareaTheme}>
                                <TextField type="textarea" required={true} label="what's on your mind?" name="comment"
                                          value={form.comment} multiline minRows={5} onChange={handleChange}
                                />
                            </ThemeProvider>
                            <FormHelperText className={charCount >= 900 ? '' : "HiddenField"}>
                                {1000 - charCount} characters left
                            </FormHelperText>
                            {showCommentError &&
                                <FormHelperText error={true}>Please provide your feedback.</FormHelperText>
                            }

                            <Button className="ContactSubmit" type="submit" variant="outlined">Submit</Button>
                        </FormControl>
                    </form>
                </div>
            </ThemeProvider>
        </>
    )
}

export default Contact;