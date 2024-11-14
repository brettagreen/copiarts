import { Scheduler } from "@aldabil/react-scheduler";
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState, useEffect } from 'react';
import { TextField, DialogActions, Button, ThemeProvider } from '@mui/material';
import { eventFormTheme } from '../css/styles';
import CopiartsApi from '../api';
import dayjs from 'dayjs';

	let topStart;
	let topEnd;
	let delId;
	
	const CustomEditor = ({ scheduler }) => {
		const event = scheduler.edited;

		const [state, setState] = useState(
			{
				title: event?.title || "",
				start: event?.start || dayjs(topStart),
				end: event?.end || dayjs(topEnd),
				location: event?.location || "2 South Ingersoll Madison Wi 53704",
				host: event?.host || "",
				description: event?.description || ""
			}
		);

		const [error, setError] = useState("");

		const handleChange = (value, name) => {

			setState((prev) => {
				return {
					...prev,
					[name]: value
				};
			});
		};

		const handleSubmit = async (e) => {
			let uploadEvent;

			// Your own validation
			if (state.title.length < 3) {
				return setError("Min 3 letters");
			}
		
			try {
				scheduler.loading(true);
		
				/**Simulate remote data saving */
				const added_updated_event = (await new Promise((res) => {
					/**
					 * Make sure the event have 4 mandatory fields
					 * event_id: string|number
					 * title: string
					 * start: Date|string
					 * end: Date|string
					 */
					uploadEvent = {
						event_id: event?.event_id || Math.random(),
						title: state.title,
						start: scheduler.state.start.value,
						end: scheduler.state.end.value,
						location: state.location,
						host: state.host,
						description: state.description
					};
					setTimeout(async () => {
						res(uploadEvent);
			
						await CopiartsApi.saveEvent(uploadEvent);
					}, 3000);
				}))
		
			scheduler.onConfirm(added_updated_event, event ? "edit" : "create");

			scheduler.close();
			} finally {
				scheduler.loading(false);
			}
		};

		return (
			<form>
				<ThemeProvider theme={eventFormTheme}>
					<div style={{ padding: "1rem" }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label="Start"
								value={state.start}
								inputFormat="MM/dd/yyyy hh:mm a"
								onChange={(newValue) => handleChange(newValue, 'start')}
								fullWidth 
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label="End"
								value={state.end}
								inputFormat="MM/dd/yyyy hh:mm a"
								onChange={(newValue) => handleChange(newValue, "end")}
								fullWidth 
							/>
						</LocalizationProvider>
						<TextField
							label="Title"
							value={state.title}
							onChange={(e) => handleChange(e.target.value, "title")}
							error={!!error}
							helperText={error}
							fullWidth
						/>
						<TextField
							label="Location"
							value={state.location}
							onChange={(e) => handleChange(e.target.value, "location")}
							fullWidth
						/>
						<TextField
							label="Host"
							value={state.host}
							onChange={(e) => handleChange(e.target.value, "host")}
							fullWidth
						/>
						<TextField
							label="Description"
							value={state.description}
							onChange={(e) => handleChange(e.target.value, "description")}
							fullWidth
						/>
					</div>
				</ThemeProvider>
				<DialogActions>
					<Button onClick={scheduler.close}>Cancel</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</form>
		);
	};

function Calendar() {
	let edit;
	let del;

	const location = useLocation();
	if ((location.pathname).includes('admin')) {
		edit = true;
		del = true;
	} else {
		edit = true;
		del = true;
	}

	const [events, setEvents] = useState(null);

	async function loadEvents() {
		let allEvents = await CopiartsApi.get('events');
		for (let event of allEvents) {
			event.start = new Date(event.start)
			event.end = new Date(event.end)

		}
		console.log('allevents', allEvents);
		setEvents(allEvents);
	}

	const handleCellClick = (start, end, resourceKey, resourceValue) => {
		console.log('getting here')
		topStart = start;
		topEnd = end;
	}

	const deleteEvent = async (id) => {
		return new Promise((res, rej) => {
			setTimeout(async () => {
			    res(id);
			    await CopiartsApi.deleteEvent(id);
			}, 1500);
		});		
	}

	const editEvent = async (event) => {
		event.start = dayjs(event.start);
		event.end = dayjs(event.end);
	}
	
	if (!events) {
		loadEvents();
	} else {
		return(
			<div style={{width: '60vw'}}> 
				<Scheduler view="week" editable={edit} deletable={del} events={events} onCellClick={handleCellClick}
					onDelete={deleteEvent} week={{weekStartOn:0, startHour:8, endHour:22, navigation:true}}
					onEventEdit={editEvent} customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
					viewerExtraComponent={(fields, event) => {
						return(
							<div>
								<p>{event.start + ' - ' + event.end}</p>
								<p>Location: {event.location || "2 South Ingersoll Madison, Wi 53703"}</p>
								{event.host ? <p>Host: {event.host}</p> : null}
								<p>Description: {event.description || null}</p>
							</div>
						);
					}}
				/>
			</div>
		);
	}

}

export default Calendar;