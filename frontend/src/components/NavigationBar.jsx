import { Box } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { memo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { toolbarMenuTheme } from '../css/styles';
import '../css/NavigationBar.css'

/**
 * @component /frontend/src/components/NavigationBar
 * @requires module:mui/material/Box
 * @requires module:mui/material/MuiAppBar
 * @requires module:mui/material/Toolbar
 * @requires module:mui/material/Link
 * @requires module:react:memo
 * @requires module:react:useEffect
 * @requires module:mui/material/styles/ThemeProvider
 * @requires module:/frontend/src/css/styles/toolbarMenuTheme
 * @description Navbar component. This goes on top. fixed
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} navbar
 *
 */

const NavigationBar = memo(function NavigationBar() {

    useEffect(() => {
        if (sessionStorage.getItem('color')) {
            document.getElementById('navbox').style.setProperty('background', sessionStorage.getItem('color'));
        }
    }, []);

    return (
        <Box id="navbox">
            <ThemeProvider theme={toolbarMenuTheme}>
                <MuiAppBar id="navappbar">
                    <Toolbar>
                        <div id="navtoolbar">
                            <Link href='/' underline='hover'>
                                <img className="CornucopiaLogo" src="/images/cornucopia.png"
                                        srcSet="/images/cornucopia.png 1x, /images/cornucopia-2x.png 2x, /images/cornucopia-3x.png 3x" 
                                        alt="cornucopia logo" title="Home"/>
                            </Link>
                            <Link href='/' underline='hover'>
                                Home
                            </Link>
                            <Link href='/about' underline='hover'>
                                About Us
                            </Link>
                            <Link href='/gallery' underline='hover'>
                                Gallery
                            </Link>
                            <Link href='/additional-information' underline='hover'>
                                Membership/Peer Support/Contact Us
                            </Link>
                        </div>
                        <div id="donateblock">
                            <Link rel="nofollow" id="donate" target="_blank" href="https://donorbox.org/cornucopia-inc">Donate</Link>
                        </div>
                    </Toolbar>
                </MuiAppBar>
            </ThemeProvider>
        </Box>
    );
});

export default NavigationBar;