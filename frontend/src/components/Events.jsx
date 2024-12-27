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
				<div key={event.title+idx}>
				{idx === 0 && <h2 id="eventshead">Events this week</h2>}
					<div className="EventItem">
						<div>
							<h1 className="EventTitle" key={"summary"+idx}>{event.title}</h1>
							<h2 className="EventTime" key={"time"+idx}>{fullDay[dateStart.getDay()] + ' ' + dateStart.toLocaleDateString()+' '}
								{dateStart.toLocaleTimeString()} - {dateEnd.toLocaleTimeString()}</h2>
							{event.host && <h2 className="EventHost" key={"host"+idx}>Host: {event.host}</h2>}
							{/* {event.host === 'unknown unknown' ? null : <img key={"icon"+idx} src={`/icons/${event.icon}`} width={250} height={250} alt="host icon"/>} */}
							<h2 className="EventDescription" key={"description"+idx} id="eventsdescription">{event.description}</h2>
							<h2 className="EventLocation" key={"location"+idx}>{event.location}</h2>
							{event.location !== DEFAULT_ADDRESS &&
								<iframe key={"map"+idx} id="eventsmap"
									loading="lazy" src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation(event.location)}&key=${API_KEY}`}>
								</iframe>
							}
						</div>
					</div>
				</div>
			)
		}) : <><h2>no events this week</h2></>
	)

}

export default Events;