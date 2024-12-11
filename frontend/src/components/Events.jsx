import { useEffect, useState } from 'react';
import CopiartsApi from '../api';
import '../css/Events.css'

function Events() {

	const [events, setEvents] = useState(null);

	/**
	 * @const
	 * google maps api key
	 */
	const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

	let dateStart;
	let dateEnd;

    useEffect(() => {
        async function fetchEvents() {
			const calEvents = await CopiartsApi.get('events');
			setEvents(calEvents);
        }

        fetchEvents();
    }, []);

	function parseLocation(location = "2 S Ingersoll St, Madison, Wi 53704") {
		const segments = location.split(',');
		let parsedLocation = '';
		segments.forEach((val) => {
			parsedLocation += val.replace(' ', '+');
		})
		return parsedLocation;
	}

	return(
		events && events.slice(0,3).map((event, idx) => {
			dateStart = new Date(event.start);
			dateEnd = new Date(event.end);
			return (
				<>
					<div className="EventItem">
						<div key={idx}>
							<h2 key={"summary"+idx}>{event.title}</h2>
							<h3 key={"time"+idx}>Time: {dateStart.toLocaleDateString()} @ {dateStart.toLocaleTimeString()}
								- {dateEnd.toLocaleDateString()} @ {dateEnd.toLocaleTimeString()}</h3>
							{event.host && <h3 key={"host"+idx}>Host: {event.host}</h3>}
							{/* {event.host === 'unknown unknown' ? null : <img key={"icon"+idx} src={`/icons/${event.icon}`} width={250} height={250} alt="host icon"/>} */}
							<h4 key={"description"+idx} id="eventsdescription">{event.description}</h4>
							<h3 key={"location"+idx}>Location: 2 S Ingersoll St, Madison, Wi 53704</h3>
							<iframe key={"map"+idx} id="eventsmap"
							 	loading="lazy" src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation()}&key=${API_KEY}`}>
							</iframe>
						</div>
					</div>
				</>
			)
		})
	)

}

export default Events;