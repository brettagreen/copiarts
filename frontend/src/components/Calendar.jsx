/**
 * @typedef {Object} event - calendar event object 
 * @property {number} event_id 
 * @property {number=} group_id
 * @property {string} title
 * @property {Date} start
 * @property {Date} end
 * @property {string} location
 * @property {string} host
 * @property {string} description
 * @property {string=} period
 * 
*/

/**
 * @typedef {Object} state - event object state 
 * @property {number} event_id 
 * @property {number=} group_id
 * @property {string} title
 * @property {Date} start
 * @property {Date} end
 * @property {string} location
 * @property {string} host
 * @property {string} description
 * @property {boolean} repeat
 * @property {string=} period
 * 
*/

/**
 * @typedef {Object} scheduler - Scheduler
 * @property {boolean} editable 
 * @property {boolean} deletable
 * @property {Object[event]} events
 * @property {function} onCellClick
 * @property {boolean=false} agenda
 * @property {function} onDelete
 * @property {Object={weekStartOn:0, startHour:11, endHour:19, navigation:true}} week
 * @property {function} onEventEdit
 * @property {function} onEventClick
 */

import { Scheduler } from "@aldabil/react-scheduler";
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState, useRef } from 'react';
import { TextField, DialogActions, Button, ThemeProvider, Checkbox, Dialog, DialogTitle,
			 Select, MenuItem, InputLabel, FormControl, FormControlLabel } from '@mui/material';
import { eventFormTheme } from '../css/styles';
import CopiartsApi from '../api';
import dayjs from 'dayjs';
import { RRule } from 'rrule';
import '../css/Calendar.css'

let topStart;
let topEnd;

/**
 * @component /frontend/src/components/CustomEditor
 * @requires module:aldabil/react-scheduler/Scheduler
 * @requires module:mui/x-date-pickers/AdapterDayjs
 * @requires module:mui/x-date-pickers/LocalizationProvider
 * @requires module:mui/x-date-pickers/DateTimePicker
 * @requires module:react.useState
 * @requires module:/frontend/src/css/styles/eventFormTheme
 * @requires module:/frontend/src/api
 * @requires module:dayjs/dayjs
 * @requires module:RRule/rrule
 * @requires module:mui/material/FormControlLabel
 * @requires module:mui/material/Checkbox
 * @requires module:mui/material/ThemeProvider
 * @requires module:mui/material/TextField
 * @requires module:mui/material/FormControl
 * @requires module:mui/material/Select
 * @requires module:mui/material/InputLabel
 * @requires module:mui/material/MenuItem
 * @requires module:mui/material/DialogActions
 * @requires module:mui/material/Button
 * @description CustomEditor component. Allows for customized handling, editing, and submitting of calender events
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @param {Object} scheduler - { see typedef }
 * @returns {JSX.Element} updated Calendar reflecting underlying delete or commit actions (removed/added events)
 *
 */
const CustomEditor = ({ edit, setEdit, loadEvents, scheduler }) => {
	const event = scheduler.edited;

	/**
	 * 
	 * @typedef {controlState} - useState hook. event state and set event state
	 * @property {state} state - state of event in question
	 * @property {function} setState - sets state of event in question
	 * 
	 */
    /**
     * @type {controlState}
     */
	const [state, setState] = useState(
		{
			title: event?.title || "",
			start: event?.start || dayjs(topStart),
			end: event?.end || dayjs(topEnd),
			location: event?.location || "2 South Ingersoll Madison Wi 53704",
			host: event?.host || "",
			description: event?.description || "",
			repeat: event?.period || false,
			period: event?.period || "",
			edit: event?.edit || false
		}
	);

     /**
     * @typedef {Object} controlError - useState hook. author's articles and set author's articles
     * @property {boolean} error - t/f does editor form contain validation error(s)?
     * @property {function} setError - set t/f has validation errors
     */
    /**
     * @type {controlError}
     */
	const [error, setError] = useState("");

    /**
	 * controlled input of state object
     * @param {string} value - event value
	 * @param {string} name - event key
     * @returns {undefined}
     */
	const handleChange = (value, name) => {

		setState((prev) => {
			return {
				...prev,
				[name]: value
			};
		});
	};

    /**
	 * prepares event(s) for submission to /backend/api/calendar/calendarEvents.json

     * @returns {undefined}
     */
	const handleSubmit = async (e) => {
		let groupId;
		let ruleStartTimes;
		let ruleEndTimes;
		let uploadEvents = [];
		const start = scheduler.state.start.value;
		const end = scheduler.state.end.value;

		if (state.repeat) {
			groupId = Math.random();

			ruleStartTimes = new RRule(
				{
					freq: state.period === 'weekly' ? RRule.WEEKLY : RRule.MONTHLY,
					//interval: 5,
					//byweekday: [RRule.MO, RRule.FR],
					dtstart: start,
					until: new Date(new Date(start).setMonth(start.getMonth() + 3)) //three months out, always
				}
			).all();

			ruleEndTimes = new RRule(
				{
					freq: state.period === 'weekly' ? RRule.WEEKLY : RRule.MONTHLY,
					//interval: 5,
					//byweekday: [RRule.MO, RRule.FR],
					dtstart: end,
					until: new Date(new Date(end).setMonth(end.getMonth() + 3)) //three months out, always
				}
			).all();

			ruleStartTimes.forEach((dateStart, index) => {

				/**
				 * Make sure the event has the 4 MANDATORY fields
				 * event_id: string|number
				 * title: string
				 * start: Date|string
				 * end: Date|string
				 */
				uploadEvents.push(
					{
						event_id: edit ? event.event_id : Math.random(),
						group_id: edit ? event.group_id : groupId,
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
					event_id: edit ? event.event_id : Math.random(),
					title: state.title,
					start: start,
					end: end,
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
	
			const saveToBackend = (await new Promise((res) => {
				setTimeout(async () => {
					if (edit) {
						await CopiartsApi.updateEvents(uploadEvents);
					} else {
						await CopiartsApi.saveEvents(uploadEvents);
					}
					for (let up of uploadEvents) {
						up.start = new Date(up.start);
						up.end = new Date(up.end);
					}
					res(uploadEvents);
					setEdit(false);
					loadEvents();
				}, 1500);
			}));
			
		scheduler.onConfirm(saveToBackend, edit ? "edit" : "create");

		scheduler.close();
		} finally {
			scheduler.loading(false);
		}
	};

	//checkbox componenent
	const checkbox = <FormControlLabel control={<Checkbox checked={state.repeat}
															value={state.repeat}
															disableRipple={true}
															onChange={(e) => handleChange(e.target.checked, "repeat")}/>} 
										label="Repeat event?" 
					/>

	return (
		<form>
			<ThemeProvider theme={eventFormTheme}>
				<div id="eventForm">
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

					{!edit &&
						<FormControl>
							{checkbox}
						</FormControl>
					}

					{((state.repeat || state.period) && !edit) &&
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
					}

				</div>
			</ThemeProvider>
			<DialogActions>
				<Button onClick={scheduler.close}>Cancel</Button>
				<Button onClick={handleSubmit}>Submit</Button>
			</DialogActions>
		</form>
	);
};

/**
 * @component /frontend/src/components/Calendar
 * @requires module:react-router-dom/useLocation
 * @requires module:react/useState
 * @requires module:react/useRef
 * @requires module:/frontend/src/api
 * @requires module:mui/material/Dialog
 * @requires module:mui/material/DialogTitle
 * @requires module:mui/material/DialogActions
 * @requires module:mui/material/Button
 * 
 * @description customized Calendar component. passes event handlers to Scheduler component. 
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} customized Scheduler component
 *
 */
function Calendar() {
	let editable;
	let del;

    /**
     * the useLocation object allows for logic to be run (or not) depending on current URL
     * @see https://reactrouter.com/6.22.3/hooks/use-location
     * @type {Object}
     */
	const location = useLocation();
	if ((location.pathname).includes('admin')) {
		editable = true;
		del = true;
	} else {
		editable = false;
		del = false;
	}

	/**
     * the useRef is a hook "that lets you reference a value that’s not needed for rendering"
     * @see https://react.dev/reference/react/useRef
     * used to make sure useEffect hook logic doesn't run on first rendering of page
     * @type {Object}
     */
	const postInitialLoad = useRef(false);
	/**
     * the useRef is a hook "that lets you reference a value that’s not needed for rendering"
     * @see https://react.dev/reference/react/useRef
     * keeps track of object's group_id value between renders
     * @type {Object}
     */
	const groupId = useRef(null);
	/**
     * the useRef is a hook "that lets you reference a value that’s not needed for rendering"
     * @see https://react.dev/reference/react/useRef
     *keeps track of object's deleteId value between renders
     * @type {Object}
     */
	const deleteId = useRef(null);
	
	const [edit, setEdit] = useState(false);

	/**
     * @typedef {Object} controlEvents - useState hook.
     * @property {boolean} events - calendar event objects
     * @property {function} setEvents - set event objects
     */
    /**
     * @type {controlEvents}
     */
	const [events, setEvents] = useState(null);

	/**
     * @typedef {Object} controlModal - useState hook. show/hide modal dialog
     * @property {boolean} modal - is modal showing?
     * @property {function} setModal - set modal showing true/false
     */
    /**
     * @type {controlModal}
     */
	const [modal, setModal] = useState(false);

	/**
     * @typedef {Object} controlDeleteOption - useState hook. delete single event, or all grouped events
     * @property {boolean} deleteOption - "one" or "all" (or "" if irrelevant to flow)
     * @property {function} setDeleteOption - sets one of above mentioned options.
     */
    /**
     * @type {controlDeleteOption}
     */
	const [deleteOption, setDeleteOption] = useState(null);

	/**
	 * load events as saved in /backend/api/calendar/calendarEvents.json
	 * @async
	 * @returns {undefined}
	 */
	async function loadEvents() {
		let allEvents = await CopiartsApi.get('events');
		for (let event of allEvents) {
			event.start = new Date(event.start)
			event.end = new Date(event.end)

		}
		setEvents(allEvents);
	}

    /**
	 * dumb way (incredibly dumb way?) of making available (as globals) default values of start and end datetime values
	 * from clicked calendar cell event so that Scheduler component has access to them.
     * @param {Date} start - event start datetime
	 * @param {Date} end - event end datetime
     * @returns {undefined}
     */
	const handleCellClick = (start, end, resourceKey, resourceValue) => {
		topStart = start;
		topEnd = end;
	}

    /**
     * if event has an associated group_id value, set that value to the groupId ref
	 * otherwise, set ref to null
     * @param {Object} event - event object 
     * @returns {undefined}
     */
	const handleEventClick = (event) => {

		if (event.group_id) {
			groupId.current = event.group_id
		} else {
			groupId.current = null;
		}
	}

    /**
     * format event object's start and end times so that they're compatible with the Scneduler.
	 * assign edit attribue to true.
     * @param {Object} event - event object
     * @returns {undefined}
     */
	const editEvent = async (event) => {
		console.log('no problems')
		event.start = dayjs(event.start);
		event.end = dayjs(event.end);
		setEdit(true);
	}

    /**
     * if event being deleted doesn't have a groupId attribute, DeleteOption modal dialog is skipped
	 * otherwise, DeleteOption modal diaglog pops right up, yee-haw.
     * @param {number} id - event id
     * @returns {undefined}
     */
	const deleteEvent = async (id) => {
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
        /**
         * remove event(s) from /backend/api/calendar/calendarEvents.json and reload events thereupon
		 * @param {Object} arg - json {event_id: id} || {group_id: id}
         * @async
         * @returns {undefined}
         */
		async function processDelete(arg) {
			setTimeout(async () => {
				await CopiartsApi.deleteEvents(arg);
				groupId.current = null;
				deleteId.current = null;
				loadEvents();
			}, 1500);

			document.getElementsByClassName("css-s22wio")[0].remove();

		}

		if (postInitialLoad.current) {
			if (groupId.current && deleteOption === "all") {
				processDelete({"group_id": groupId.current});
			} else {
				processDelete({"event_id": deleteId.current});
			}
		} else {
			postInitialLoad.current = true;
		}

	}, [deleteOption]);

/**
 * @component /frontend/src/components/DeleteOptions
 * @requires module:react/useState
 * @requires module:mui/material/Dialog
 * @requires module:mui/material/DialogTitle
 * @requires module:mui/material/DialogActions
 * @requires module:mui/material/Button
 * 
 * @description modal dialog component used by Calendar component.
 *  			sets stateful values for Calendar component related to event deletion.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {undefined}
 *
 */
	function DeleteOptions() {
		/**
		 * @typedef {Object} controlModalOpen - useState hook. show/hide modal dialog
		 * @property {boolean} open - is modal showing?
		 * @property {function} setOpen - set modal showing true/false
		 */
		/**
		 * @type {controlModalOpen}
		 */
		const [open, setOpen] = useState(true);
	  
		/**
		 * sets proper deleteOption value. closes modal
		 * @returns {undefined}
		 */
		const handleOne = () => {
		  setOpen(false);
		  setDeleteOption("one");
		  setModal(false);
		};

		/**
		 * sets proper deleteOption value. closes modal
		 * @returns {undefined}
		 */
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
			<div id="calendar"> 
				<h2 className="CalendarEventsHead">Check out our event calendar</h2>
				<Scheduler view="week" editable={editable} deletable={del} events={events} onCellClick={handleCellClick}
					agenda={false} onDelete={deleteEvent} week={{weekStartOn:0, startHour:11, endHour:19, navigation:true}}
					onEventEdit={editEvent} onEventClick={handleEventClick} customEditor={(scheduler) => <CustomEditor edit={edit}
					setEdit={setEdit} loadEvents={loadEvents} scheduler={scheduler} />}
					viewerExtraComponent={(fields, event) => {
						return(
							<div>
								<p>{event.start + ' - ' + event.end}</p>
								<p>Location: {event.location || "2 South Ingersoll Madison, Wi 53703"}</p>
								{event.host && <p>Host: {event.host}</p>}
								<p>Description: {event.description || null}</p>
							</div>
						);
					}}
				/>
				{modal && <DeleteOptions />}
			</div>
		);
	}

}

export default Calendar;