import { Box } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { memo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { toolbarMenuTheme } from '../css/styles';
import '../css/NavigationBar.css'

/**
 * @component /frontend/src/components/NavigationBar
 * @requires module:mui/material/Box
 * @requires module:mui/material/AppBar
 * @requires module:mui/material/Toolbar
 * @requires module:mui/material/Link
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
    return (
        <Box id="navbox">
            <ThemeProvider theme={toolbarMenuTheme}>
                <MuiAppBar id="navappbar">
                    <Toolbar>
                        <div id="navtoolbar">
                            <Link href='/' underline='hover'>
                                <img src={`/images/cornucopia.png`} width={250} height={100} alt="cornucopia logo" title="Home"/>
                            </Link>
                            <Link href='/about' underline='hover'>
                                About Us
                            </Link>
                            <Link href='/gallery' underline='hover'>
                                Gallery
                            </Link>
                            {/* <Link href='/media' underline='hover'>
                                Newsletters/Media
                            </Link> */}
                            <Link href='/additional-information' underline='hover'>
                                Membership/Peer Support/Contact Us
                            </Link>
                        </div>
                        <div>
                            <Link id="donate" target="_blank" href="https://donorbox.org/cornucopia-inc">Donate</Link>
                        </div>
                    </Toolbar>
                </MuiAppBar>
            </ThemeProvider>
        </Box>
    );
});

export default NavigationBar;