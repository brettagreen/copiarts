import '../css/Home.css'
import { Link } from '@mui/material';

function Home() {

	return (
		<>
			<div style={{backgroundColor: "rgb(255, 203, 164)"}}>
				<iframe src="https://calendar.google.com/calendar/embed?src=brettalangreen%40gmail.com&ctz=America%2FChicago" 
					style={{border: "0", width: "80vw", height: "80vh", frameBorder: "0", scrolling: "yes"}}></iframe> 
			</div>

			<Link href="/events" underline='always'>View the Events page for more details</Link>
		</>
	)
}

export default Home