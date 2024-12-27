/**
 * @typedef {Object} form - feedback form! 
 * @property {string} nameFirst 
 * @property {string} nameLast
 * @property {string} email
 * @property {string} comment
 * 
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import FeedbackIcon from '@mui/icons-material/Feedback';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { ThemeProvider } from '@mui/material';
import CopiartsApi from '../api';
import { formTheme, textareaTheme } from '../css/styles';
import '../css/Form.css';

/**
 * @component /frontend/src/components/Survey
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
function Survey({ singlePage }) {

    /**
     * @const
     * form object
     */
    const INIT_STATE = { nameFirst: '', nameLast: '', email: '',
		colorScheme: {
			"purple/green/yellow": false, "blue/red/green": false,
			"fuscia/dark purple/gray": false, "green/yellow/ivory": false, "dark blue/turquoise/gold": false, 
			"lilac/dark blue": false, "pastel purple/light blue": false, "white smoke/bright red": false
		}, 
		fontScheme: {
			"Barlow": false, "Forum": false, "L'ilgrotesk": false, "Eirene": false, "Guminert": false, "Type Union": false,
			"Annie": false, "Indie Flower": false, "Komika": false, "Compagnon": false, "Quintessential": false,
			"Cartoonist": false, "Paul Maul": false, "Pompiere": false
		},
		singlePage: 'neither', favorite: '', leastFavorite: '', other: '' };

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
	 * @typedef {controlFavoriteCharCount} - useState hook. charCount state and set charCount state 
	 * @property {number} favoriteCharCount - number of characters 
	 * @property {function} setFavoriteCharCount - set number of characters entered
	 * 
	 */
    /**
     * @type {controlFavoriteCharCount}
     */
    const [favoriteCharCount, setFavoriteCharCount] = useState(0);

	/**
	 * 
	 * @typedef {controlLeastCharCount} - useState hook. charCount state and set charCount state 
	 * @property {number} leastCharCount - number of characters 
	 * @property {function} setLeastCharCount - set number of characters entered
	 * 
	 */
    /**
     * @type {controlLeastCharCount}
     */
    const [leastCharCount, setLeastCharCount] = useState(0);

	/**
	 * 
	 * @typedef {controlOtherCharCount} - useState hook. charCount state and set charCount state 
	 * @property {number} otherCharCount - number of characters 
	 * @property {function} setOtherCharCount - set number of characters entered
	 * 
	 */
    /**
     * @type {controlOtherCharCount}
     */
    const [otherCharCount, setOtherCharCount] = useState(0);

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
	 * @typedef {controlFavoriteError} - useState hook. comment/feedback field error? and set such state
	 * @property {boolean} showFavoriteError - error in comment/feedback field?
	 * @property {function} setShowFavoriteError - set error for comment/feedback field
	 * 
	 */
    /**
     * @type {controlFavoriteError}
     */
    const [showFavoriteError, setShowFavoriteError] = useState(false);

	/**
	 * 
	 * @typedef {controlLeastError} - useState hook. comment/feedback field error? and set such state
	 * @property {boolean} showLeastError - error in comment/feedback field?
	 * @property {function} setShowLeastError - set error for comment/feedback field
	 * 
	 */
    /**
     * @type {controlLeastError}
     */
    const [showLeastError, setShowLeastError] = useState(false);

	/**
	 * 
	 * @typedef {controlOtherError} - useState hook. comment/feedback field error? and set such state
	 * @property {boolean} showOtherError - error in comment/feedback field?
	 * @property {function} setShowOtherError - set error for comment/feedback field
	 * 
	 */
    /**
     * @type {controlFavoriteError}
     */
    const [showOtherError, setShowOtherError] = useState(false);

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

	const redirect  = useNavigate();

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

		if (form.nameLast.length > 0 && form.nameLast.length <= 2) { 
            setShowNameLastError(true);
			error = true;
        } else {
            setShowNameLastError(false);
        }

        if (!(/[a-zA-Z\d]*@[a-zA-Z\d]*\.[A-Za-z]{2,3}/).test(form.email) || form.email.length <= 5) {
            setShowEmailError(true);
            error = true;
        } else {
            setShowEmailError(false);
        }

        if (form.favorite.length > 0 && favoriteCharCount <= 5) {
            setShowFavoriteError(true)
            error = true;
        } else {
            setShowFavoriteError(false);
        }

        if (form.leastFavorite.length > 0 && leastCharCount <= 5) {
            setShowLeastError(true)
            error = true;
        } else {
            setShowLeastError(false);
        }

        if (form.other.length > 0 && otherCharCount <= 5) {
            setShowOtherError(true)
            error = true;
        } else {
            setShowOtherError(false);
        }

        if (!error) {
            await CopiartsApi.postSurvey(form);
            setAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Thank you for your feedback!
                </Alert>
            );
            setTimeout(() => {
				if (singlePage) {
					redirect('#homeid');
				} else {
					redirect('/');
				}
            }, 1500);

        }
    }

	/**
	 * updates form object on change to form field
	 * @async
	 * @returns {undefined}
	 */
    function handleChange(event, type) {
        if (event.target.name === 'nameFirst') {
            if (event.target.value.length+1 <= 30) {
                setForm({...form, [event.target.name]: event.target.value});
            }

		} else if (event.target.name === 'nameLast') {
			if (event.target.value.length+1 <= 30) {
				setForm({...form, [event.target.name]: event.target.value});
			}

        } else if (event.target.name === 'email') {
            if (event.target.value.length+1<= 50) {
                setForm({...form, [event.target.name]: event.target.value});
            }

        } else if (type === 'colorcheck') {
			let newForm = {...form};
			newForm.colorScheme = {...newForm['colorScheme'], [event.target.name]: event.target.checked}
			setForm(newForm);

		} else if (type === 'fontcheck') {
			let newForm = {...form};
			newForm.fontScheme = {...newForm['fontScheme'], [event.target.name]: event.target.checked}
			setForm(newForm);

		} else if (event.target.name === 'singlePage') {
			setForm({...form, [event.target.name]: event.target.value});

		} else if (event.target.name === 'favorite') {
			if (event.target.value.length+1 <= 1000) {
                setFavoriteCharCount(event.target.value.length);
                setForm({...form, [event.target.name]: event.target.value});
            }

        } else if (event.target.name === 'leastFavorite') {
			if (event.target.value.length+1 <= 1000) {
            	setLeastCharCount(event.target.value.length+1);
            	setForm({...form, [event.target.name]: event.target.value});
			}
			
        } else { //other
            if (event.target.value.length+1 <= 1000) {
                setOtherCharCount(event.target.value.length+1);
                setForm({...form, [event.target.name]: event.target.value});
            }
        }
    }

    return(
        <>
            <div className="PageHeader">
                <FeedbackIcon size="medium" />
					<h3>Your feedback will help shape what this website looks like!</h3>
				<FeedbackIcon />
                <br />
                <caption>* indicates required field</caption>
            </div>

            {alert && alert}

            <ThemeProvider theme={formTheme}>
                <div className="BackdropWrapper">
                    <form autoComplete="off" noValidate encType="multipart/form-data" onSubmit={submitAndClear}> 
                        <FormControl sx={{width: '60%'}} id="surveyformwidth" margin="normal">

                            <TextField type="text" required={true} label="First name" name="nameFirst" value={form.nameFirst} onChange={handleChange}
                            />
                            {showNameFirstError && 
                                <FormHelperText error={true}>Please provide a first name</FormHelperText>
                            }

							<TextField type="text" required={false} label="Last name" name="nameLast" value={form.nameLast} onChange={handleChange}
                            />
                            {showNameLastError && 
                                <FormHelperText error={true}>Please provide a last name</FormHelperText>
                            }

                            <TextField inputProps={{type: "email"}} required={true} label="Email" name="email" value={form.email} onChange={handleChange}
                            />
                            {showEmailError && 
                                <FormHelperText error={true}>A real email address is required.</FormHelperText>
                            }
							<br />
							{/* colors scheme checkbox stuff*/}
							<FormLabel>What color schemes did you like? You may select more than one value.</FormLabel>
							<FormGroup onChange={(e) => handleChange(e, 'colorcheck')}>
								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme["purple/green/yellow"]} name="purple/green/yellow" />
									}
									label="purple/green/yellow"
								/>

								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme["blue/red/green"]} name="blue/red/green" />
									}
									label="blue/red/green"
								/>
								
								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme['fuscia/dark purple/gray']} name="fuscia/dark purple/gray" />
									}
									label="fuscia/dark purple/gray"
								/>

								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme['green/yellow/ivory']} name="green/yellow/ivory" />
									}
									label="green/yellow/ivory"
								/>

								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme['dark blue/turquoise/gold']} name="dark blue/turquoise/gold" />
									}
									label="dark blue/turquoise/gold"
								/>

								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme['lilac/dark blue']} name="lilac/dark blue" />
									}
									label="lilac/dark blue"
								/>

								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme['pastel purple/light blue']} name="pastel purple/light blue" />
									}
									label="pastel purple/light blue"
								/>

								<FormControlLabel
									control={
										<Checkbox checked={form.colorScheme['white smoke/bright red']} name="white smoke/bright red" />
									}
									label="white smoke/bright red"
								/>
							</FormGroup>
							<br />
							{/* fonts scheme checkbox stuff*/}
							<FormLabel>What fonts did you like? You may select more than one value.</FormLabel>
							<FormGroup onChange={(e) => handleChange(e, 'fontcheck')}>
								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme["Barlow"]} name="Barlow" />
									}
									label="Barlow"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Forum']} name="Forum" />
									}
									label="Forum"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme["L'ilgrotesk"]} name="L'ilgrotesk" />
									}
									label="L'il Grotesk"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Eirene']} name="Eirene" />
									}
									label="Eirene"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Guminert']} name="Guminert" />
									}
									label="Guminert"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Type Union']} name="Type Union" />
									}
									label="Type Union"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Annie']} name="Annie" />
									}
									label="Annie"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Indie Flower']} name="Indie Flower" />
									}
									label="Indie Flower"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Komika']} name="Komika" />
									}
									label="Komika"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Compagnon']} name="Compagnon" />
									}
									label="Compagnon"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Quintessential']} name="Quintessential" />
									}
									label="Quintessential"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Cartoonist']} name="Cartoonist" />
									}
									label="Cartoonist"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Paul Maul']} name="Paul Maul" />
									}
									label="Paul Maul"
								/>

								<FormControlLabel
									control={
										<Checkbox className="FontCheck" checked={form.fontScheme['Pompiere']} name="Pompiere" />
									}
									label="Pompiere"
								/>
							</FormGroup>
							<br />
							{/* single-page app question */}
							<FormLabel required={true}>Did you prefer the single-page or traditional layout?</FormLabel>
							<RadioGroup name="singlePage" value={form.singlePage} onChange={handleChange}>
								<FormControlLabel value="single" control={<Radio />} label="Single-page layout" />
								<FormControlLabel value="traditional" control={<Radio />} label="Traditional layout" />
								<FormControlLabel value="neither" control={<Radio />} label="No preference" />
							</RadioGroup>
							<br />
							{/* open-ended question textarea stuff*/}
                            <ThemeProvider theme={textareaTheme}>
                                <TextField type="textarea" required={false} label="What's your favorite part of the site?" name="favorite"
                                          value={form.favorite} multiline minRows={5} onChange={handleChange}
                                />
                            </ThemeProvider>
                            <FormHelperText className={favoriteCharCount >= 900 ? '' : "HiddenField"}>
                                {1000 - favoriteCharCount} characters left
                            </FormHelperText>
                            {showFavoriteError &&
                                <FormHelperText error={true}>Please provide some more detail</FormHelperText>
                            }

							<ThemeProvider theme={textareaTheme}>
                                <TextField type="textarea" required={false} label="What's your least favorite part of the site?" name="leastFavorite"
                                          value={form.leastFavorite} multiline minRows={5} onChange={handleChange}
                                />
                            </ThemeProvider>
                            <FormHelperText className={leastCharCount >= 900 ? '' : "HiddenField"}>
                                {1000 - leastCharCount} characters left
                            </FormHelperText>
                            {showLeastError &&
                                <FormHelperText error={true}>Please provide some more detail</FormHelperText>
                            }

							<ThemeProvider theme={textareaTheme}>
                                <TextField type="textarea" required={false} label="Is there anything else you'd like to share?" name="other"
                                          value={form.other} multiline minRows={5} onChange={handleChange}
                                />
                            </ThemeProvider>
                            <FormHelperText className={otherCharCount >= 900 ? '' : "HiddenField"}>
                                {1000 - otherCharCount} characters left
                            </FormHelperText>
                            {showOtherError &&
                                <FormHelperText error={true}>Please provide some more detail</FormHelperText>
                            }

                            <Button className="ContactSubmit" type="submit" variant="outlined" color="primary">Submit</Button>
                        </FormControl>
                    </form>
                </div>
            </ThemeProvider>
        </>
    )
}

export default Survey;