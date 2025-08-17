import '../css/About.css';
import '../css/Events.css';
import { useEffect, useState } from 'react';
import { readItems, createDirectus, rest, staticToken } from '@directus/sdk';

/**
 * @component /frontend/src/components/About
 * @requires module:mui/material/Link
 * 
 * @description About component. mostly text, some of it formatted. Talks about history of Cornucopia.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - formatted text going over Cornucopia and its history.
 *
 */
function About() {

	const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;
	const [text, setText] = useState(null);

    useEffect(() => {

        async function fetchAboutText() {
			console.log("getting to fetch about text")
			const directus = createDirectus('https://copiarts.directus.app').with(rest()).with(staticToken(DIRECTUS_TOKEN));

			let text = await directus.request(readItems('AboutUs'));
			text = text[0].text;
			
			setText(text);
        }

		function setTimer() {
			console.log("Getting to setTimer")
			const fadeElements = document.querySelectorAll('.fade-element');
			const fadeElements1 = document.querySelectorAll('.fade-element1');
	
			for (let el of fadeElements) {
				el.classList.toggle("show");
			}

			for (let el of fadeElements1) {
				el.classList.remove('show');
			}

			setInterval(() => {
				
				const aboutImages = document.querySelectorAll('.aboutimages');
				const aboutImages1 = document.querySelectorAll('.aboutimages1');
				
				if (aboutImages[0].style.display === 'block') {
					console.log("getting to aboutImages showing")
					for (let el of aboutImages) {
						el.style.display = 'none';
					}

					for (let el of aboutImages1) {
						el.style.display = 'block';
					}
				} else {
					console.log("getting to aboutImages1 showing")
					for (let el of aboutImages) {
						el.style.display = 'block';
					}

					for (let el of aboutImages1) {
						el.style.display = 'none';
					}
				}

				for (let el of fadeElements) {
					el.classList.toggle('show');
				}

				for (let el of fadeElements1) {
					console.log("GETTING HEREEE")
					el.classList.toggle('show');
				}
			}, 5000);
		}

        fetchAboutText();
		setTimer();
    }, []);

	return (
		<div id="aboutid">
			<section id="aboutText">
				<h3>About Cornucopia</h3>
				{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
			</section>
			<div>
				<section className="aboutimages">
					<img className="fade-element" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
				</section>
				<section className="aboutimages">
					<img className="fade-element" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
				</section>
				<section className="aboutimages1">
					<img className="fade-element1" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element1" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element1" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
				</section>
				<section className="aboutimages1">
					<img className="fade-element1" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element1" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
					<img className="fade-element1" src="https://picsum.photos/200" alt="homepage image" style={{borderRadius: '.5em'}}/>
				</section>
			</div>
		</div>
	)
}

export default About;