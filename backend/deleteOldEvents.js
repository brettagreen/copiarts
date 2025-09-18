	const fs = require("node:fs");
	try {
		const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
		const allEvents = JSON.parse(file);

		let today = new Date();
		let midnight = today.toISOString().split('T')[0] + 'T00:00:00.000Z';
		today = new Date(midnight);

		const twoWeeksAgo = new Date(today.setDate(today.getDate() - 14));

		let nonDeletedEvents = allEvents.filter((event) => {
			return new Date(event.start) >= twoWeeksAgo;
		});

		const print = JSON.stringify(nonDeletedEvents)

		console.log("results", print);
		fs.writeFileSync('./api/calendar/CalendarEvents.json', print, 'utf-8');
	} catch (err) {
		console.log('error', err)
	}