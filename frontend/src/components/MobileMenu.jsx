import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { mobilePaperTheme } from '../css/styles';
import '../css/MobileMenu.css';


function MobileMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
	  setAnchorEl(null);
	};

	const mediaQuery = window.matchMedia('(min-width: 1169px)');

	mediaQuery.addEventListener("change", function() {
		if (mediaQuery.matches) {
			setAnchorEl(null);
		}
	});

	return (
		<ThemeProvider theme={mobilePaperTheme}>
			<div className="MobileMenu">
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="open nav menu"
					onClick={handleClick}>
					<MenuIcon />
				</IconButton>
				<Menu
					id="menuitems"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button'
					}}>
					<MenuItem className="Item" onClick={handleClose}><Link href='#homeid' underline='hover'>Home</Link></MenuItem>
					<MenuItem className="Item" onClick={handleClose}><Link href='#aboutid' underline='hover'>About Us</Link></MenuItem>
					<MenuItem className="Item" onClick={handleClose}><Link href='#mobilegalleryid' underline='hover'>Gallery</Link></MenuItem>
					<MenuItem className="Item" onClick={handleClose}><Link href='#informationid' underline='hover'>Membership/Peer Support/Contact Us</Link></MenuItem>
					<Divider className="MobileDivider" />
					<MenuItem className="Item" onClick={handleClose}><img className="InstaIcon" src="/images/instagram_icon.png" alt="instagram social" /></MenuItem>
					<MenuItem className="Item" onClick={handleClose}><img className="TikTokIcon" src="/images/tiktok_icon.png" alt="tik tok social" /></MenuItem>
					<Divider className="MobileDivider" />
					<div className="Item">
                		<address id="mobileaddress" className="FooterAddress">
							Cornucopia Inc.<br />
							&#9;South Ingersoll St.<br />
							&#9;Madison WI 53703<br />
							email: cornucopia@copiarts.org<br />
							tel: 608-467-6646
                		</address>
            		</div>
				</Menu>
			</div>
		</ThemeProvider>
	)

}

export default MobileMenu;