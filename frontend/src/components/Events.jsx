import CopiartsApi from '../api';
import { useEffect, useState } from 'react';

function Events() {

	const [events, setEvents] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
			const calEvents = await CopiartsApi.get('events');
			console.log('calEvents', calEvents);
			setEvents(calEvents);
			
        }

        fetchEvents();
    }, []);

	function getHost(val) {
		const sub1 = val.description.substr(val.description.indexOf('🖉 ')+4);
		return sub1.substr(0, sub1.indexOf('<br>')-1)
	}

	return(
		events ? events.map((val, idx) => {
			return (
				<>
					<h2>{val.summary}</h2>
					<h3>Location: {val.location}</h3>
					<h3>Time: {val.start.date} - {val.end.date}</h3>
					<h3>Host: {getHost(val)}</h3>
					<h3>{val.description.substr(0, val.description.indexOf('<pre>'))}</h3>
				</>
			)
		}) : null
	)

}

export default Events;