import '../css/Home.css'
import Calendar from './Calendar';
import Events from './Events';

function Home() {

	return (
		<>
			<div className="headerfooter">
				<h3>Open Monday through Friday  12:00-5:00  Daily open studio, music and food</h3>

				<h3 style={{width: '80vw', marginLeft: '10vw'}}>
					Mission: Cornucopia is an arts and wellness center run
					by and for people in mental health and substance use recovery.  
					We promote independence, growth and dignity
					through self-directed recovery and peer support.
				</h3>
			</div>

			{/* <Link href="/events" underline='always' color='#f3f2f2'>View the Events page for more details</Link> */}

			<div style={{float: 'left'}}>
				<Calendar />
			</div>
			<div style={{float: 'left'}}>
				<Events />
			</div>

		</>

	)
}

export default Home