import { Box } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import { toolbarMenuTheme } from '../css/styles';
import '../css/NavigationBar.css'

function NavigationBar() {

    return (
        <Box sx={{marginBottom: '70px', fontFamily: 'Roboto'}}>
            <ThemeProvider theme={toolbarMenuTheme}>
                <MuiAppBar position="fixed" sx={{backgroundColor: 'rgba(0,0,0,.85)', width: '100%', marginBottom: '80px'}}>
                    <Toolbar>
                        <div style={{width: '100%'}}>
                            <Link href='/' underline='hover'>
                                <img src={`/images/cornucopia.png`} width={250} height={100} alt="cornucopia logo" title="Home"/>
                            </Link>
                            <Link href='/about' underline='hover'>
                                About Us
                            </Link>
                            <Link href='/gallery' underline='hover'>
                                Gallery
                            </Link>
                            <Link href='/media' underline='hover'>
                                Newsletters/Media
                            </Link>
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
}

export default NavigationBar;