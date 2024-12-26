/**
 * @typedef {Object} photo - gallery photo object 
 * @property {string} media_url
 * @property {string} caption
 * @property {string} permalink
 * @property {string} timestamp
 * 
*/

import CopiartsApi from '../api';
import { useEffect, useState } from 'react';
import { galleryTheme } from '../css/styles';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@emotion/react';
import '../css/Gallery.css';

/**
 * @component /frontend/src/components/Gallery
 * @requires module:mui/frontend/src/api
 * @requires module:react.useEffect
 * @requires module:react.useState
 * @requires module:/frontend/src/css/styles/galleryTheme
 * @requires module:mui/material/Grid
 * @requires module:mui/material/Modal
 * @requires module:mui/material/Link
 * @requires module:mui/material/Button
 * @requires module:mui/material/Box
 * @requires module:emotion/react/ThemeProvider
 * @description Gallery component. shows images as pulled from copiarts instagram acct in an aesthetically pleasing manner.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} images structurally displayed vis-a-vis the MUI Grid component.
 *
 */
function Gallery() {

	/**
	 * @typedef {controlPhotos} - useState hook. first name field error? and set such state
	 * @property {[photo]} photos - collection of gallery photo objects
	 * @property {function} setPhotos - set gallery photos
	 * 
	 */
    /**
     * @type {controlPhotos}
     */
	const [photos, setPhotos] = useState(null);

	/**
	 * @typedef {controlModal} - useState hook. determine whether modal is shown or not
	 * @property {<Modal?} modal - modal of gallery image
	 * @property {function} setModal - set whether modal is shown or not
	 * 
	 */
    /**
     * @type {controlModal}
     */
	const [modal, setModal] = useState(null);

	/**
	 * @const
	 * style/css object for use with modal window
	 */
	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		backgroundColor: 'rgba(0,0,0,.1)',
		border: '2px solid #000',
		boxShadow: 24
	};

    useEffect(() => {
        /**
         * fetches photos from backend api
         * @async
         * @returns {[photo]}
         */
        async function fetchPhotos() {
			const photoArray = await CopiartsApi.get('photos');
			setPhotos(photoArray);
        }

        fetchPhotos();
    }, []);

	function showModal(photo) {
		setModal(
			<ThemeProvider theme={galleryTheme}>
				<Modal className="GalleryModal" key={"modal"+photo.media_url} open={true} onClose={() => setModal(null)}
					aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
					<Box style={modalStyle}>
						<div className="GalleryImageHolder">
							<img className="GalleryModalImage" key={"img2"+photo.media_url} src={photo.media_url} alt="modal image" /><br />
							<Link key={"instalink"+photo.permalink} href={photo.permalink} target="_blank">View on Instagram app</Link>
						</div>
					</Box>
				</Modal>
			</ThemeProvider>
		)
	}

	if (photos) {
		return(
			<div id="galleryid">
				<Grid id="daGrid" container rowSpacing={2} columnSpacing={{xs:2, sm:3, md:4}} columns={{xs:2, sm:3, md:4}}>
					{photos.map((photo, idx) => {
						return (
								<>
									<Grid key={"grid"+idx} item xs={1} sm={1} md={1}>
										<Button key={"button"+idx} onClick={() => {showModal(photo)}}>
											<img key={"img"+idx} className="InstaImage" src={photo.media_url} loading="lazy" height={250}
												width={250} alt="insta image" />
										</Button>
										<figcaption key={"caption"+idx}>{photo.caption}</figcaption>
									</Grid>
									{modal && modal}
								</>
							)
					})}
				</Grid>
			</div>
		)
	}

}

export default Gallery;