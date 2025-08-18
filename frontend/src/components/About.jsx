import '../css/About.css';
import '../css/Events.css';
import { useEffect, useState } from 'react';
import { readItems, createDirectus, rest, staticToken } from '@directus/sdk';
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

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

	const images = [
		{
			original: "https://picsum.photos/id/1018/1000/600/",
			thumbnail: "https://picsum.photos/id/1018/250/150/",
		},
		{
			original: "https://picsum.photos/id/1015/1000/600/",
			thumbnail: "https://picsum.photos/id/1015/250/150/",
		},
		{
			original: "https://picsum.photos/id/1019/1000/600/",
			thumbnail: "https://picsum.photos/id/1019/250/150/",
		},

			{
			original: "https://picsum.photos/id/1017/1000/600/",
			thumbnail: "https://picsum.photos/id/1017/250/150/",
		},
		{
			original: "https://picsum.photos/id/1016/1000/600/",
			thumbnail: "https://picsum.photos/id/1016/250/150/",
		},
		{
			original: "https://picsum.photos/id/1014/1000/600/",
			thumbnail: "https://picsum.photos/id/1014/250/150/",
		}
	]

	const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;
	const [text, setText] = useState(null);

    useEffect(() => {

        async function fetchAboutText() {
			const directus = createDirectus('https://copiarts.directus.app').with(rest()).with(staticToken(DIRECTUS_TOKEN));

			let text = await directus.request(readItems('AboutUs'));
			text = text[0].text;
			
			setText(text);
        }

		function setTimer() {
			const fadeElements = document.querySelectorAll('.fade-element');
			//const fadeElements1 = document.querySelectorAll('.fade-element1');
	
			for (let el of fadeElements) {
				el.classList.toggle("show");
			}

			// for (let el of fadeElements1) {
			// 	el.classList.remove('show');
			// }

			setInterval(() => {
				
				const aboutImages = document.querySelectorAll('.aboutimages');
				const aboutImages1 = document.querySelectorAll('.aboutimages1');
				
				// if (aboutImages[0].style.display === 'block') {
				// 	console.log("getting to aboutImages showing")
				// 	for (let el of aboutImages) {
				// 		el.style.display = 'none';
				// 	}

				// 	for (let el of aboutImages1) {
				// 		el.style.display = 'block';
				// 	}
				// } else {
				// 	console.log("getting to aboutImages1 showing")
				// 	for (let el of aboutImages) {
				// 		el.style.display = 'block';
				// 	}

				// 	for (let el of aboutImages1) {
				// 		el.style.display = 'none';
				// 	}
				// }

				for (let el of fadeElements) {
					el.classList.toggle('show');
				}

				// for (let el of fadeElements1) {
				// 	console.log("GETTING HEREEE")
				// 	el.classList.toggle('show');
				// }
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
			<div className="aboutimages">
				<ImageGallery items={images} />
			</div>
		</div>
	)
}

export default About;