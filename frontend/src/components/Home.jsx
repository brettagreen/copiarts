import Link from '@mui/material/Link';
import Calendar from './Calendar';
import Events from './Events';
import { useEffect, useState } from 'react';
import { readItems, createDirectus, rest, staticToken } from '@directus/sdk';
import '../css/Gallery.css';
import '../css/Home.css';
import '../css/Events.css';

/**
 * @component /frontend/src/components/Home
 * @requires module:/frontend/src/components/Calendar
 * @requires module:/frontend/src/components/Events
 * @description Home page business! displays event calendar with some other images and information
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} returns home page
 *
 */
function Home({ singlePage }) {

	const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;
	const [text, setText] = useState(null);

    useEffect(() => {

        async function fetchAboutText() {
			const directus = createDirectus('https://copiarts.directus.app').with(rest()).with(staticToken(DIRECTUS_TOKEN));
			console.log("directus", directus);

			let text = await directus.request(readItems('Home'));
			console.log('text', text);
			text = text[0].Text;
			console.log("result", text);			
			setText(text);
        }

        fetchAboutText();
    }, []);

	/**
	 * @const
	 * google maps api key
	 */
	const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

	const responsive = {
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	return (
		<div id="homeid">

			<div id="mobilelogo">
				<Link href='/' underline='hover'>
                    <img className="MobileCornucopiaLogo" src="/images/cornucopia.png"
					 		srcSet="/images/cornucopia.png 1x, /images/cornucopia-2x.png 2x, /images/cornucopia-3x.png 3x"
							alt="Cornucopia logo" title="Home"/>
                </Link>
			</div>

			<div className="headerfooter">
				{/* <h3>Open Monday through Friday 12:00-5:00. Daily open studio, music and food</h3>
				<h3 id="headermission">
					Mission: Cornucopia is an arts and wellness center run
					by and for people in mental health and substance use recovery.  
					We promote independence, growth and dignity
					through self-directed recovery and peer support.
				</h3> */}
				{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
			</div>

			<section id="homesection">
				<div id="sectiononeheight">
					<div className="HomesectionOne">
						<img id="buildingimage" src="/images/copiarts_building_front.jpg" alt="building front" />
					</div>
					<div className="HomesectionOne">
						<img id="mapimage" src={`https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY}`}
							srcSet={`https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY} 1x,
						 				https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY} 2x,
										https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY} 3x`}
								alt="googly maps" 
						/>
						<div id="mapaddresstext">
							<span>2 South Ingersoll St. Madison, Wi 53703</span>
						</div>
					</div>
					<div id="homearrow">
						<img src="/images/left_arrow.png" alt="arrow icon" /> Find us here!
					</div>
				</div>
				<div id="calevents">
					<div className="HomeCalendar">
						<Calendar singlePage={singlePage} />
					</div>
					<div className="HomeEvents">
						<Events />
					</div>
				</div>
				<div id="mobilecalevents">
					<div className="HomeCalendar">
						<Calendar singlePage={singlePage} />
					</div>
					<div className="HomeEvents">
						<Events />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home