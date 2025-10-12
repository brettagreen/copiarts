/**
 * @typedef {Object} event - Cornucopia event widget object 
 * @property {string} title
 * @property {Date} start
 * @property {Date} end
 * @property {string} host
 * @property {string} description
 * 
*/

import { useEffect, useState } from 'react';
import CopiartsApi from '../api';
import '../css/Events.css'

/**
 * @component /frontend/src/components/Events
 * @requires module:react.useEffect
 * @requires module:react.useState
 * @requires module:/frontend/src/api

 * @description Events component. Renders event information clear and legibile
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - text document, some of it formatted. All event info will be rendered.
 *
 */

function Events() {

	/**
	 * 
	 * @typedef {events} - useState hook. set events
	 * @property {state} events - events in question
	 * @property {function} setEvents - sets state of events in question
	 * 
	 */
	/**
     * @type {events}
     */
	const [events, setEvents] = useState([]);

	let dateStart;
	let dateEnd;
	let options = {
  			hour: '2-digit',
  			minute: '2-digit'
		}

	const fullDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        async function fetchEvents() {
			const dailyEvents = await CopiartsApi.getDailyEvents();
			setEvents(dailyEvents);
        }

        fetchEvents();
    }, []);

	return(
		events.length !== 0 ? events.map((event, idx) => {
			dateStart = new Date(event.start);
			dateEnd = new Date(event.end);
			return (
				<div key={event.title+idx}>
				{idx === 0 && <h2 id="eventshead">Today's Events</h2>}
					<div className="EventItem">
						<div>
							<h1 className="EventTitle" key={"summary"+idx}>{event.title}</h1>
							<h2 className="EventTime" key={"time"+idx}>{fullDay[dateStart.getDay()] + ' ' + dateStart.toLocaleDateString()+' '}
								{dateStart.toLocaleTimeString([], options)} - {dateEnd.toLocaleTimeString([], options)}</h2>
							{event.host && <h2 className="EventHost" key={"host"+idx}>Host: {event.host}</h2>}
							{/* {event.host === 'unknown unknown' ? null : <img key={"icon"+idx} src={`/icons/${event.icon}`} width={250} height={250} alt="host icon"/>} */}
							<h2 className="EventDescription" key={"description"+idx} id="eventsdescription">{event.description}</h2>
							<h2 className="EventLocation" key={"location"+idx}>{event.location}</h2>
							{/* {event.location !== DEFAULT_ADDRESS &&
								<iframe key={"map"+idx} id="eventsmap"
									loading="lazy" src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation(event.location)}&key=${API_KEY}`}>
								</iframe>
							} */}
						</div>
					</div>
				</div>
			)
		}) : <><h2>no events today</h2></>
	)

}

export default Events;