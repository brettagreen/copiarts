import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MinimizeIcon from '@mui/icons-material/Minimize';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { useState, useRef, useEffect, useContext, memo } from 'react';
import { ThemeProvider } from '@mui/material';
import { featuresTheme, toggleButtonsTheme } from '../css/styles';
import App_SinglePage from './App_SinglePage';
import App from './App';
import Link from '@mui/material/Link';
import UserContext from '../userContext';
import '../css/FeaturesTest.css';

const FeaturesTest = memo(function FeaturesTest({ show, checked }) {
	const [variant, setVariant] = useState('fonts');
	const [showOptions, setShowOptions] = useState(show);
	const [showFonts, setShowFonts] = useState(true);
	const [showColors, setShowColors] = useState(false);

	const fontButton = useRef();

	const root = useContext(UserContext).root;

	function minimize() {
		sessionStorage.setItem('featuresPanel', 'minimized');
		setShowOptions(false);
	}

	function expand() {
		sessionStorage.setItem('featuresPanel', 'open');
		setShowOptions(true);
	}

	function toggle(e) {
		if (e.target.value === "fonts") {
			setShowFonts(true);
			setShowColors(false);
		} else {
			setShowFonts(false);
			setShowColors(true);
		}
		setVariant(e.target.value);
	}

	function setBackgroundColor(one, two, three, angle='90deg') {
		const root = document.getElementById('root');
		let linear;
		
		if (three) {
			linear = `linear-gradient(${angle}, ${one}, ${two} 50%, ${three})`;
			root.style.setProperty('background', linear);
		} else {
			linear = `linear-gradient(${angle}, ${one}, ${two})`;
			root.style.setProperty('background', linear);
		}

		sessionStorage.setItem('color', linear);
	}

	function setFont(fontName) {
		const root = document.getElementById('root');

		sessionStorage.setItem('font', fontName);
		
		root.style.setProperty('font-family', fontName);
	}

	function adjustSinglePage() {

		if (checked) {
			root.render(
				<App />
			)
		} else {
			root.render(
				<App_SinglePage />
			)
		}
	}

	useEffect(() => {
		const element = document.getElementById('grabmyid');

		if (showOptions) {
			element.classList.remove("HidePanelGroups");
			element.classList.add('PanelGroups');
		} else {
			element.classList.remove("PanelGroups");
			element.classList.add('HidePanelGroups');
		}
	}, [showOptions]);

	useEffect(() => {
		fontButton.current.focus();
	}, [])

	return (
		<div id="grabmyid" className="PanelGroups">

			{showOptions ? 
				<div className="SelectionPanel">
					<h5>hide</h5>&nbsp;
					<IconButton disableRipple={true} disableTouchRipple={true} onClick={minimize}>
						<MinimizeIcon className="PanelIcon" fontSize='large' />
					</IconButton>
				</div>
				:   
				<div className="SelectionPanel">
					<h5>show</h5>&nbsp;
					<IconButton disableRipple={true} disableTouchRipple={true} onClick={expand}>
						<KeyboardArrowUpIcon className="PanelIcon" fontSize='large' />
					</IconButton>
				</div>
			}

			<p id="welcomemessage">
				Hey! Welcome to a beta-version of our new site! Try out the various color and font selections shown below. You can also switch between
				a single-page website layout and a multi-page layout. When you're done looking around and expirmenting, please let us know what you think and
				&nbsp;<Link href="/survey" target="_blank" underline='always'>take our survey!</Link>
			</p>

			<div className="ButtonGroups">
				<ThemeProvider theme={toggleButtonsTheme}>
					<ToggleButtonGroup value={variant} onChange={toggle}>
						<ToggleButton disableRipple={true} ref={fontButton} value="fonts" variant="contained">show font options</ToggleButton>
						&nbsp;&nbsp;
						<ToggleButton disableRipple={true} value="colors" variant="contained">show color options</ToggleButton>
					</ToggleButtonGroup>
				</ThemeProvider>
				&nbsp;&nbsp;
				<FormControl>
					<FormControlLabel 
						control={<Checkbox checked={checked}
										   value={checked}
										   disableRipple={true}
										   onChange={adjustSinglePage}/>}
						label="single-page application"
					/>
				</FormControl>
			</div>

			{showColors &&
				<div>
					<h4>3-tone 90°</h4>
					<ButtonGroup variant='contained'>
						<Button sx={{background:'linear-gradient(90deg, #62128285, #0F6B1D85 50%, #E3AE6485)'}} 
									onClick={() => setBackgroundColor('#62128285', '#0F6B1D85', '#E3AE6485')}
						>purple/green/yellow</Button>

						<Button sx={{background:'linear-gradient(90deg, #0000FF85, #FF000085 50%, #00800085)'}}
									onClick={() => setBackgroundColor('#0000FF85', '#FF000085', '#00800085')}
						>blue/red/green</Button>

						<Button sx={{background:'linear-gradient(90deg, #D8125B85, #30046585 50%, #2C2E3985)'}}
									onClick={() => setBackgroundColor('#D8125B85', '#30046585', '#2C2E3985')}>
						fuscia/dark purple/gray</Button>

						<Button sx={{background:'linear-gradient(90deg, #009B4D85, #FFCC0085 50%, #FAF5E985)'}}
									onClick={() => setBackgroundColor('#009B4D85', '#FFCC0085', '#FAF5E985')}
						>green/yellow/ivory</Button>

						<Button sx={{background:'linear-gradient(90deg, #0A182885, #17858285 50%, #BFA18185)'}}
									onClick={() => setBackgroundColor('#0A182885', '#17858285', '#BFA18185')}
						>deep blue/turquoise/light orange</Button>
					</ButtonGroup>

					<h4>2-tone 90°</h4>
					<ButtonGroup variant='contained'>
						<Button sx={{background:'linear-gradient(90deg, #F8F8F985, #11143985)'}}
								onClick={() => setBackgroundColor('#F8F8F985', '#11143985')}>
						lilac/dark blue</Button>

						<Button sx={{background:'linear-gradient(90deg, #C5ADC585, #B2B5E085)'}}
									onClick={() => setBackgroundColor('#C5ADC585', '#B2B5E085')}>
						pastel purple/light blue</Button>
						
						<Button sx={{background:'linear-gradient(90deg, #F0F0F085, #E7473C85)'}}
									onClick={() => setBackgroundColor('#F0F0F085', '#E7473C85')}>
						white smoke/bright red</Button>
					</ButtonGroup>

					<h4>mixed-tone 45°</h4>
					<ButtonGroup variant='contained'>
						<Button sx={{background:'linear-gradient(45deg, #C5ADC585, #B2B5E085)'}}
								onClick={() => setBackgroundColor('#C5ADC585', '#B2B5E085', '', '45deg')}>
						pastel purple/light blue</Button>

						<Button sx={{background:'linear-gradient(45deg, #0A182885, #17858285 50%, #BFA18185)'}}
									onClick={() => setBackgroundColor('#0A182885', '#17858285', '#BFA18185', '45deg')}>
						dark blue/turquoise/gold</Button>
					</ButtonGroup>
				</div>
			}

			{showFonts &&
				<ThemeProvider theme={featuresTheme}>
					<div onClick={(e) => setFont(e.target.name)}>
						<ButtonGroup variant='contained'>
							<Button id='barlow' name='barlow'>Barlow Font</Button>
							<Button id='forum' name='forum'>Forum Font</Button>
							<Button id='lilgrotesk' name='lilgrotesk'>L'il Grotesk Font</Button>
						</ButtonGroup>
						<ButtonGroup variant='contained'>
							<Button id='eirene' name='eirene'>Eirene Font</Button>
							<Button id='guminert' name='guminert'>Guminert Font</Button>
							<Button id='typeunion' name='typeunion'>TypeUnion Font</Button>
						</ButtonGroup>
						<ButtonGroup variant='contained'>
							<Button id='annie' name='annie'>Annie Font</Button>
							<Button id='indieflower' name='indieflower'>Indie Flower Font</Button>
							<Button id='komika' name='komika'>Komika Font</Button>
						</ButtonGroup>
						<ButtonGroup variant='contained'>
							<Button id='compagnon' name='compagnon'>Compagnon Font</Button>
							<Button id='quintessential' name='quintessential'>Quinessential Font</Button>
							<Button id='cartoonist' name='cartoonist'>Cartoonist Font</Button>
						</ButtonGroup>
						<ButtonGroup variant='contained'>
							<Button id='paulmaul' name='paulmaul'>Paul Maul Font</Button>
							<Button id='pompiere' name='pompiere'>Pompiere Font</Button>
						</ButtonGroup>
					</div>
				</ThemeProvider>
			}

		</div>
	)
});

export default FeaturesTest;