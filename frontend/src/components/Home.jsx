import '../css/Home.css';
import '../css/Events.css';
import Calendar from './Calendar';
import Events from './Events';

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
function Home() {

	/**
	 * @const
	 * google maps api key
	 */
	const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

	/**
	 * makes event location string google maps friendly
	 * @function
	 * @returns {string} - (google maps api friendly) parsed location
	 */
	function parseLocation(location = "2 S Ingersoll St, Madison, Wi 53704") {
		const segments = location.split(',');
		let parsedLocation = '';
		segments.forEach((val) => {
			parsedLocation += val.replace(' ', '+');
		})
		return parsedLocation;
	}

	return (
		<>
			<div className="headerfooter">
				<h3>Open Monday through Friday 12:00-5:00. Daily open studio, music and food</h3>

				<h3 id="headermission">
					Mission: Cornucopia is an arts and wellness center run
					by and for people in mental health and substance use recovery.  
					We promote independence, growth and dignity
					through self-directed recovery and peer support.
				</h3>
			</div>

			<section id="homesection">
				<div id="sectiononeheight">
					<div className="HomesectionOne">
						<embed type="video/mp4" src="https://www.youtube.com/embed/Cb82cy9b7Hk?si=CSp9j8srFAcb_eO0"
								width="560" height="315" 
						/>
					</div>
					<div className="HomesectionOne">
						<iframe width="560" height="315" loading="lazy"
							src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation()}&key=${API_KEY}`}>
						</iframe>
					</div>
					<div id="homearrow">
						<img width={100} height={100} src="/images/left_arrow.png" alt="arrow icon" /> Find us here!
					</div>
				</div>
				<div id="homecalendar">
					<Calendar />
				</div>
				<div id="homeevents">
					<h2 className="CalendarEventsHead">Events this week</h2>
					<Events />
				</div>
			</section>
		</>
	)
}

export default Home