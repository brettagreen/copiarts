import Link from '@mui/material/Link';
import Calendar from './Calendar';
import Events from './Events';
import Carousel from 'react-multi-carousel';
import '../css/Gallery.css';
import 'react-multi-carousel/lib/styles.css';
import '../css/Home.css';
import '../css/Events.css';

/**
 * @component /frontend/src/components/Home
 * @requires module:/frontend/src/components/Calendar
 * @requires module:/frontend/src/components/Events
 * @description Home page business! displays event calendar with some other images and information
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} returns home page
 *
 */
function Home({ singlePage }) {

	/**
	 * @const
	 * google maps api key
	 */
	const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

	const responsive = {
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	return (
		<div id="homeid">

			<div id="mobilelogo">
				<Link href='/' underline='hover'>
                    <img className="MobileCornucopiaLogo" src="/images/cornucopia.png"
					 		srcSet="/images/cornucopia.png 1x, /images/cornucopia-2x.png 2x, /images/cornucopia-3x.png 3x"
							alt="Cornucopia logo" title="Home"/>
                </Link>
			</div>

			<div className="headerfooter">
				<h3>Open Monday through Friday 12:00-5:00. Daily open studio, music and food</h3>
				<h3 id="headermission">
					Mission: Cornucopia is an arts and wellness center run
					by and for people in mental health and substance use recovery.  
					We promote independence, growth and dignity
					through self-directed recovery and peer support.
				</h3>
			</div>
			
			<Carousel 
				className="Carousel"
				responsive={responsive} 
				swipeable={true}
				draggable={false}
				showDots={false}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
				keyBoardControl={true}
				//customTransition="all .5"
				transitionDuration={500}
				containerClass="carousel-container"
				removeArrowOnDeviceType={[]}
				itemClass="Carousel-Photos">
				<img src="https://picsum.photos/300" alt="carousel image" />
				<img src="https://picsum.photos/300" alt="carousel image" />
				<img src="https://picsum.photos/300" alt="carousel image" />
				<img src="https://picsum.photos/300" alt="carousel image" />
				<img src="https://picsum.photos/300" alt="carousel image" />
				<img src="https://picsum.photos/300" alt="carousel image" />
				<img src="https://picsum.photos/300" alt="carousel image" />

			</Carousel>

			<section id="homesection">
				<div id="sectiononeheight">
					<div className="HomesectionOne">
						{/* <embed id="welcomevideo" type="video/mp4" src="https://www.youtube-nocookie.com/embed/Cb82cy9b7Hk?si=CSp9j8srFAcb_eO0" /> */}
						<video id="welcomevideo" controls>
							<source src="/placeholder.mp4" type="video/mp4" />
						</video>
					</div>
					<div className="HomesectionOne">
						<img src={`https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY}`}
							srcSet={`https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY} 1x,
						 				https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY} 2x,
										https://maps.googleapis.com/maps/api/staticmap?center=2+South+Ingersoll+St,Madison,Wi&zoom=17&size=560x315&markers=color:red%7C2+South+Ingersoll+St,Madison,Wi&key=${API_KEY} 3x`}
								alt="googly maps" 
						/>
						<div id="mapaddresstext">
							<span>2 South Ingersoll St. Madison, Wi 53704</span>
						</div>
					</div>
					<div id="homearrow">
						<img src="/images/left_arrow.png" alt="arrow icon" /> Find us here!
					</div>
				</div>
				<div id="calevents">
					<div className="HomeCalendar">
						<Calendar singlePage={singlePage} />
					</div>
					<div className="HomeEvents">
						<Events />
					</div>
				</div>
				<div id="mobilecalevents">
					<div className="HomeCalendar">
						<Calendar singlePage={singlePage} />
					</div>
					<div className="HomeEvents">
						<Events />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home