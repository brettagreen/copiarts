import CopiartsApi from '../api';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

function Events() {

	const [events, setEvents] = useState(null);
	let dateStart;
	let dateEnd;

    useEffect(() => {
        async function fetchEvents() {
			const calEvents = await CopiartsApi.get('events');
			console.log('calEvents', calEvents);
			setEvents(calEvents);
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
		events ? events.map((event, idx) => {
			dateStart = new Date(event.start.dateTime);
			dateEnd = new Date(event.end.dateTime);
			return (
				<>
					<div style={{float: "left", clear: "left", width: '97vw', textAlign: 'left', marginLeft: '2em'}}>
						<div key={idx} style={{float: "left", width: 'calc(60%)'}}>
							<h2 key={"summary"+idx}>{event.summary}</h2>
							<h3 key={"location"+idx}>Location: {event.location}</h3>
							<h3 key={"time"+idx}>Time: {dateStart.toLocaleDateString()} @ {dateStart.toLocaleTimeString()}
								- {dateEnd.toLocaleDateString()} @ {dateEnd.toLocaleTimeString()}</h3>
							{event.host === 'unknown unknown' ? null : <h3 key={"host"+idx}>Host: </h3>}
							{event.host === 'unknown unknown' ? null : <img key={"icon"+idx} src={`/icons/${event.icon}`} width={250} height={250} alt="host icon"/>}
							<h4 key={"description"+idx} style={{marginRight: '1em'}}>{event.description}</h4>
						</div>
						<div style={{float: "left", textAlign: 'center'}}>
							<iframe key={"map"+idx} width="500" height="400" style={{border:0, marginTop: 'calc(20%)', marginBottom: 'calc(20%)'}}
							 	loading="lazy" src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation(event.location)}&key=AIzaSyARA--I6TNDLHZZ4a8HW2fug2yA5jz7PsY`}>
							</iframe>
						</div>
					</div>
					<hr />
				</>
			)
		}) : null
	)

}

export default Events;