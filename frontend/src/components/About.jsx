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
			const directus = createDirectus('https://copiarts.directus.app').with(rest()).with(staticToken(DIRECTUS_TOKEN));

			let text = await directus.request(readItems('AboutUs'));
			text = text[0].text;
			
			setText(text);
        }

        fetchAboutText();
    }, []);

	return (
		<div id="aboutid">
			<section id="aboutText">
				<h3>About Cornucopia</h3>
				{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
			</section>
			{/* <section id="aboutimages">
				<img src="https://picsum.photos/300" alt="homepage image" />
				<img src="https://picsum.photos/300" alt="homepage image" />
			</section> */}
			 
		</div>
	)
}

export default About;