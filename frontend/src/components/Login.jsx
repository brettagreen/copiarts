
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, TextField, Button, ThemeProvider, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CopiartsApi from '../api';
import { formTheme } from '../css/styles';
import UserContext from '../userContext';
import '../css/Login.css';

function Login() {

    const redirect = useNavigate();

    const setAdmin = useContext(UserContext).setAdmin;
    const admin = useContext(UserContext).admin;

    const [success, setSuccess] = useState(false)

    const INITIAL_STATE = {
        password: ''
    }

    const [show1, setShow1] = useState(false);

    const pwIcon1 = { endAdornment: <InputAdornment position="end"><IconButton onMouseOver={() => setShow1(true)}
                        onMouseLeave={() => setShow1(false)}>{show1?<VisibilityOutlinedIcon />
                        :<VisibilityOffIcon />}</IconButton></InputAdornment> };

    const [form, setForm] = useState(INITIAL_STATE);

    const [error, setError] = useState(null);

    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }

    async function submitAndClear(event) {
        event.preventDefault();

        try {
            await CopiartsApi.loginAdmin(form);
            setAdmin(true);
            setForm(INITIAL_STATE);
            setSuccess(true);
        } catch (error) {
            setError(error);
            setForm(INITIAL_STATE);
        }
    }

    useEffect(() => {
        function goToCalendar() {
            redirect('/admin/calendar');
        }
        if (success) {
            goToCalendar();
        }
    })

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
