import { Scheduler } from "@aldabil/react-scheduler";
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState, useRef } from 'react';
import { TextField, DialogActions, Button, ThemeProvider, Checkbox, Dialog, DialogContent, DialogContentText,
			 DialogTitle, Select, MenuItem, InputLabel, FormControl, FormControlLabel } from '@mui/material';
import { eventFormTheme } from '../css/styles';
import CopiartsApi from '../api';
import dayjs from 'dayjs';
import { RRule } from 'rrule';

	let topStart;
	let topEnd;
	
	const CustomEditor = ({ scheduler }) => {
		const event = scheduler.edited;

		const [state, setState] = useState(
			{
				title: event?.title || "",
				start: event?.start || dayjs(topStart),
				end: event?.end || dayjs(topEnd),
				location: event?.location || "2 South Ingersoll Madison Wi 53704",
				host: event?.host || "",
				description: event?.description || "",
				repeat: event?.period || false,
				period: event?.period || ""
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
			let groupId;
			let ruleStartTimes;
			let ruleEndTimes;
			let uploadEvents = [];
			const now = scheduler.state.start.value;

			if (state.repeat) {
				groupId = Math.random();

				ruleStartTimes = new RRule(
					{
						freq: state.period === 'weekly' ? RRule.WEEKLY : RRule.MONTHLY,
						//interval: 5,
						//byweekday: [RRule.MO, RRule.FR],
						dtstart: now,
						until: new Date(new Date(now).setMonth(now.getMonth() + 3)) //three months out, always
				    }
				).all()

				ruleEndTimes = new RRule(
					{
						freq: state.period === 'weekly' ? RRule.WEEKLY : RRule.MONTHLY,
						//interval: 5,
						//byweekday: [RRule.MO, RRule.FR],
						dtstart: now,
						until: new Date(new Date(now).setMonth(now.getMonth() + 3)) //three months out, always
				    }
				).all();

				ruleStartTimes.forEach((dateStart, index) => {

					/**
					 * Make sure the event have 4 mandatory fields
					 * event_id: string|number
					 * title: string
					 * start: Date|string
					 * end: Date|string
					 */
					uploadEvents.push(
						{
							event_id: Math.random(),
							group_id: groupId,
							title: state.title,
							start: dateStart,
							end: ruleEndTimes[index],
							location: state.location,
							host: state.host,
							description: state.description,
							period: state.period
						}
					)
				})
			} else {
				uploadEvents = [
					{
						event_id: Math.random(),
						title: state.title,
						start: scheduler.state.start.value,
						end: scheduler.state.end.value,
						location: state.location,
						host: state.host,
						description: state.description
					}
				]
			}

			// Your own validation
			if (state.title.length < 3) {
				return setError("Min 3 letters");
			}
		
			try {
				scheduler.loading(true);
		
				const added_updated_event = (await new Promise((res) => {
					setTimeout(async () => {
						res(uploadEvents);
						await CopiartsApi.saveEvents(uploadEvents);
					}, 3000);
				}))
		
			scheduler.onConfirm(added_updated_event, event ? "edit" : "create");

			scheduler.close();
			} finally {
				scheduler.loading(false);
			}
		};

		const checkbox = <FormControlLabel control={<Checkbox checked={state.repeat}
																value={state.repeat}
																disableRipple={true}
																onChange={(e) => handleChange(e.target.checked, "repeat")}/>} 
											label="Repeat event?" 
						/>

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
						<FormControl>
							{checkbox}
						</FormControl>

						<FormControl sx={{m: 1, minWidth: 200}}>
							<InputLabel id="select-input">Weekly or Monthly?</InputLabel>
							<Select component="select" name="type" value={state.period}
									onChange={(e) => handleChange(e.target.value, "period")}
									fullWidth label="Weekly or Monthly?"
									labelId="select-input"
							>
								<MenuItem key="week" value="weekly">Weekly</MenuItem>
								<MenuItem key="month" value="monthly">Monthly</MenuItem>
							</Select>
						</FormControl>
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

	const postInitialLoad = useRef(false);
	const groupId = useRef(null);
	const deleteId = useRef(null);
	const [events, setEvents] = useState(null);
	const [modal, setModal] = useState(false);
	const [deleteOption, setDeleteOption] = useState(null);

	async function loadEvents() {
		let allEvents = await CopiartsApi.get('events');
		for (let event of allEvents) {
			event.start = new Date(event.start)
			event.end = new Date(event.end)

		}
		setEvents(allEvents);
	}

	const handleCellClick = (start, end, resourceKey, resourceValue) => {
		topStart = start;
		topEnd = end;
	}

	const handleEventClick = (event) => {
		console.log("handleEventClick");
		console.log("groupId (is it a holdover?)", groupId.current);

		if (event.group_id) {
			console.log("getting here", event.group_id);
			groupId.current = event.group_id
		} else {
			groupId.current = null;
		}
	}

	const editEvent = async (event) => {
		event.start = dayjs(event.start);
		event.end = dayjs(event.end);
		event.edit = true;
	}

	const deleteEvent = async (id) => {
		console.log('deleteEvent, is there a group id?', groupId.current);
		deleteId.current = id;
		if (postInitialLoad.current) {
			if (groupId.current) {
				setModal(true);
			} else {
				setDeleteOption("");
			}
		}
	}

	useEffect(() => {

		async function processDelete() {
			if (groupId.current && deleteOption === "all") {
				console.log('group event ids', ids);
				setTimeout(async () => {
					await CopiartsApi.deleteEvents({"group_id": groupId.current});
					groupId.current = null;
					deleteId.current = null;
					loadEvents();
				}, 1500);

			} else {
				setTimeout(async () => {
					await CopiartsApi.deleteEvents({"event_id": deleteId.current});
					groupId.current = null;
					deleteId.current = null;
					loadEvents();
				}, 1500);
			}

			document.getElementsByClassName("css-s22wio")[0].remove();
			

		}

		if (postInitialLoad.current) {
			processDelete();
		} else {
			postInitialLoad.current = true;
		}

	}, [deleteOption]);

	function DeleteOptions() {
		const [open, setOpen] = useState(true);
	  
		const handleOne = () => {
		  setOpen(false);
		  setDeleteOption("one");
		  setModal(false);
		};

		const handleAll = () => {
			setOpen(false);
			setDeleteOption("all");
			setModal(false);
		}
	  
		return (
		    <>
				<Dialog
					open={open}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					>
					<DialogTitle id="alert-dialog-title">
						Delete just this event or all events like this on the calendar?
					</DialogTitle>
					<DialogActions>
						<Button onClick={handleOne}>just this event</Button>
						<Button onClick={handleAll} autoFocus>all events</Button>
					</DialogActions>
				</Dialog>
		    </>
		);
	}

	if (!events) {
		loadEvents();
	} else {
		return(
			<div style={{width: '60vw'}}> 
				<Scheduler view="week" editable={edit} deletable={del} events={events} onCellClick={handleCellClick}
					agenda={false} onDelete={deleteEvent} week={{weekStartOn:0, startHour:11, endHour:19, navigation:true}}
					onEventEdit={editEvent} onEventClick={handleEventClick} customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
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
				{modal ? <DeleteOptions /> : null}
			</div>
		);
	}

}

export default Calendar;