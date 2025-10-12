import Contact from './Contact'
import { useEffect, useState } from 'react';
import { readItems, createDirectus, rest, staticToken } from '@directus/sdk';
import '../css/AdditionalInformation.css'

/**
 * @component /frontend/src/components/AdditionalInformation
 * @requires module:mui/material/Link
 * @requires module:/frontend/src/components/Contact

 * @description AdditionalInformation component. info on membership, peer support, and Community Agreement text and contact form, too.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - text document, some of it formatted. Also, feedback submission form.
 *
 */
function AdditionalInformation() {

	/**
	 * @description API token used to return text data from DIRECTUS headless CMS
	 * @const - DIRECTUS_TOKEN
	 */
	const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;

	/**
	 * @typedef {controlText} - useState hook. set text content for page
	 * @property {string} text - page text
	 * @property {function} setText - set page text
	 * 
	 */
	/**
	 * @type {controlText}
	 */
	const [text, setText] = useState(null);

	useEffect(() => {

        async function fetchAdditionalText() {
			const directus = createDirectus('https://copiarts.directus.app').with(rest()).with(staticToken(DIRECTUS_TOKEN));

			let text = await directus.request(readItems('AdditionalInformation'));
			text = text[0].text;
			
			setText(text);
        }

        fetchAdditionalText();
    }, []);

	return(
		<div id="informationid">
			<section id="additionalText">
				{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
			</section>
			<section id="contactform">
				<Contact />
			</section>
		</div>
	)
}

export default AdditionalInformation;