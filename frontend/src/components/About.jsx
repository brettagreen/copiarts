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
			original: "/images/copiarts_art_room.jpg",
			thumbnail: "/images/copiarts_art_room_thumbnail.jpg",
			loading: "eager",
			thumbnailLoading: "eager",
			originalAlt: "art room",
			thumbnailAlt: "art room thumbnail"
		},
		{
			original: "/images/copiarts_art_room2.jpg",
			thumbnail: "/images/copiarts_art_room2_thumbnail.jpg",
			loading: "eager",
			thumbnailLoading: "eager",
			originalAlt: "art room 2",
			thumbnailAlt: "art room 2 thumbnail"
		},
		{
			original: "/images/copiarts_music.jpg",
			thumbnail: "/images/copiarts_music_thumbnail.jpg",
			loading: "eager",
			thumbnailLoading: "eager",
			originalAlt: "music room",
			thumbnailAlt: "music room thumbnail"
		},

			{
			original: "/images/copiarts_music2.jpg",
			thumbnail: "/images/copiarts_music2_thumbnail.jpg",
			loading: "eager",
			thumbnailLoading: "eager",
			originalAlt: "music room 2",
			thumbnailAlt: "music room 2 thumbnail"
		},
		{
			original: "/images/copiarts_kitchen.jpg",
			thumbnail: "/images/copiarts_kitchen_thumbnail.jpg",
			loading: "eager",
			thumbnailLoading: "eager",
			originalAlt: "kitchen",
			thumbnailAlt: "kitchen thumbnail",
			description: "this is the kitchen"
		},
		{
			original: "/images/copiarts_art_room7.jpg",
			thumbnail: "/images/copiarts_art_room7_thumbnail.jpg",
			loading: "eager",
			thumbnailLoading: "eager",
			originalAlt: "art room 7",
			thumbnailAlt: "art room 7 thumbnail"
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

        fetchAboutText();
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