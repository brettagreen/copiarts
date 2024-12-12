import { useEffect, useState } from 'react';
import CopiartsApi from '../api';
import '../css/Events.css'

function Events() {

	const [events, setEvents] = useState([]);

	/**
	 * @const
	 * google maps api key
	 */
	const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

	let dateStart;
	let dateEnd;

	const fullDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const DEFAULT_ADDRESS = "2 South Ingersoll Madison Wi 53704";

    useEffect(() => {
        async function fetchEvents() {
			const weeklyEvents = await CopiartsApi.getWeeklyEvents();
			console.log('weekly events', weeklyEvents);
			setEvents(weeklyEvents);
        }

        fetchEvents();
    }, []);

	function parseLocation(location) {
		const segments = location.split(',');
		let parsedLocation = '';
		segments.forEach((val) => {
			parsedLocation += val.replace(' ', '+');
		})
		return parsedLocation;
	}

	return(
		events.length !== 0 ? events.map((event, idx) => {
			dateStart = new Date(event.start);
			dateEnd = new Date(event.end);
			return (
				<>
					<div className="EventItem">
						<div key={idx}>
							<h2 key={"summary"+idx}>{event.title}</h2>
							<h3 key={"time"+idx}>{fullDay[dateStart.getDay()] + ' ' + dateStart.toLocaleDateString()}
								{dateStart.toLocaleTimeString()} - {dateEnd.toLocaleTimeString()}</h3>
							{event.host && <h3 key={"host"+idx}>Host: {event.host}</h3>}
							{/* {event.host === 'unknown unknown' ? null : <img key={"icon"+idx} src={`/icons/${event.icon}`} width={250} height={250} alt="host icon"/>} */}
							<h4 key={"description"+idx} id="eventsdescription">{event.description}</h4>
							<h3 key={"location"+idx}>{event.location}</h3>
							{event.location !== DEFAULT_ADDRESS &&
								<iframe key={"map"+idx} id="eventsmap"
									loading="lazy" src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation(event.location)}&key=${API_KEY}`}>
								</iframe>
							}
						</div>
					</div>
				</>
			)
		}) : <><h2>no events this week</h2></>
	)

}

export default Events;