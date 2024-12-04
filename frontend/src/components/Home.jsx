import '../css/Home.css'
import Calendar from './Calendar';

function Home() {

	const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

	function parseLocation(location = "2 S Ingersoll St, Madison, Wi 53704") {
		const segments = location.split(',');
		let parsedLocation = '';
		segments.forEach((val) => {
			parsedLocation += val.replace(' ', '+');
		})
		return parsedLocation;
	}

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

			<section style={{marginLeft: '.5em', marginRight: '.5em'}}>
				<div style={{float: 'left'}}>
					<embed type="video/mp4" src="https://www.youtube.com/embed/Cb82cy9b7Hk?si=CSp9j8srFAcb_eO0"
							width="560" height="315" 
					/>
				</div>
				
				<div style={{float: 'left', clear: 'both', marginTop: '1em'}}>
					<Calendar />
				</div>
				<div>
					<iframe style={{border:0}} width="560" height="315" loading="lazy"
						src={`https://www.google.com/maps/embed/v1/place?q=${parseLocation()}&key=${API_KEY}`}>
					</iframe>
					<img src="https://picsum.photos/200" alt="homepage image" />
					<img src="https://picsum.photos/200" alt="homepage image" />
					<img src="https://picsum.photos/200" alt="homepage image" />
					<img src="https://picsum.photos/200" alt="homepage image" />
					<img src="https://picsum.photos/200" alt="homepage image" />
					<img src="https://picsum.photos/200" alt="homepage image" />
					<img src="https://picsum.photos/200" alt="homepage image" />
				</div>

			</section>

		</>

	)
}

export default Home