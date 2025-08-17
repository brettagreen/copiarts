/**
 * @typedef {Object} photo - gallery photo object 
 * @property {string} media_url
 * @property {string} caption
 * @property {string} permalink
 * @property {string} timestamp
 * 
*/

import CopiartsApi from '../api';
import { useEffect, useState, useRef } from 'react';
import { galleryTheme } from '../css/styles';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
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

	const [paginatedPhotos, setPaginatedPhotos] = useState(null);
	const [page, setPage] = useState(1);

	const [mobilePaginatedPhotos, setMobilePaginatedPhotos] = useState(null);
	const [mobilePage, setMobilePage] = useState(1);

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
     * the useRef is a hook "that lets you reference a value that’s not needed for rendering"
     * @see https://react.dev/reference/react/useRef
     * in this case it's used in the function handleOutsideClick() function to determine if user
     * click event falls w/in returned JSX.Element tree or not
     * @type {Object}
     */
	const modalRef = useRef();
	const imageBoxRef = useRef();

	/**
	 * @const
	 * style/css object for use with modal window
	 */
	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(0,0,0,.1)',
		border: '2px solid #000',
		borderRadius: '5px',
		maxHeight: '75vh',
		objectFit: 'contain',
		boxShadow: 24
	};

    /**
     * global 'click' event handler
     * if click event falls anywhere within the NavigationBar component, then nothing happens.
     * otherwise, any open menu drawers are closed === same as closing menu drawers voluntarily
     * @global
     * @param {Object} event
     * @returns {undefined}
     */
    function handleOutsideClick(event) {
        if (modalRef.current && (modalRef.current.contains(event.target) && !imageBoxRef.current.contains(event.target))) {
            setModal(null);
        }
    }

	function handlePagination(event, value) {
		console.log('value', value);
		const one = 10 * (value - 1);
		console.log('one', one);
		const two = one + 10;
		console.log('two', two);
		setPage(value);
		console.log('photos/array', photos);
		setPaginatedPhotos(photos.slice(one, two));
	}

	function handleMobilePagination(event, value) {
		const one = 10 * (value - 1);
		const two = one + 10; 
		setMobilePage(value);
		setMobilePaginatedPhotos(photos.slice(one, two));
	}

    useEffect(() => {
		/**
         * ties handleOutsideClick() function to global document object
         */
		document.addEventListener('click', handleOutsideClick);

        /**
         * fetches photos from backend api
         * @async
         * @returns {[photo]}
         */
        async function fetchPhotos() {
			const photoArray = await CopiartsApi.get('photos');
			setPhotos(photoArray);
			setPaginatedPhotos(photoArray.slice(0,10));
			setMobilePaginatedPhotos(photoArray.slice(0,10));
        }

        fetchPhotos();
    }, []);

	function showModal(photo) {
		setModal(
			<ThemeProvider theme={galleryTheme}>
				<Modal ref={modalRef} className="GalleryModal" key={"modal"+photo.media_url} open={true} onClose={() => setModal(null)}
					aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
					<div>
						<Box ref={imageBoxRef} style={modalStyle}>
							<div className="ModalImageHolder">
								<img className="GalleryModalImage" key={"img2"+photo.media_url} src={photo.media_url} alt={'modal ' + photo.caption} /><br />
								<figcaption key={"caption"+photo.media_url}>{photo.caption}</figcaption>
							</div>
						</Box>
					</div>
				</Modal>
			</ThemeProvider>
		)
	}
	if (photos) {
		return(
			<div id="gallerydiv">
				<div id="galleryid">
					<Grid id="daGrid" container >
						{paginatedPhotos.map((photo, idx) => {
							return (
								<div className="ImageContainer" key={"photo"+idx}>
									<Button key={"button"+idx} onClick={() => {showModal(photo)}}>
										<img key={"img"+idx} className="InstaImage" src={photo.media_url} loading="lazy"
											alt={'insta image ' + photo.caption} />
									</Button>
									<figcaption className="Caption" key={"caption"+idx}>{photo.caption}</figcaption>
								</div>
							)
						})}
					</Grid>
					<div style={{display: 'inline-block', float: 'left', marginTop: '1.3em'}}>
						<Pagination sx={{float: 'left'}} count={Math.ceil(photos.length/10)} page={page} onChange={handlePagination} />
						<Button className="InstaButton" sx={{float: 'left', color: 'black', marginLeft: '1em', padding: '2em'}}>
							<Link href="https://www.instagram.com/copiacircle/" target="_blank">View on Instagram</Link>
						</Button>
					</div>
				</div>
				<div id="mobilegalleryid">
					<h3 className="GalleryHeaderBackground">Some of our artwork</h3>
					<ImageList className="MobileImageGallery" cols={2} rowHeight='auto'>
						{mobilePaginatedPhotos.map((photo, idx) => (
							<ImageListItem key={"mobileimage"+idx}>
								<img 
									key={'img'+idx}
									className="MobileImage"
									src={photo.media_url}
									alt={'insta image ' + photo.caption}
									loading="lazy"
									onClick={() => showModal(photo)}
								/>
							</ImageListItem>
						))}
					</ImageList>
					<div style={{marginTop: '2em'}}>
						<Button className="InstaButton" sx={{ float: 'right', color: 'black', marginRight: '7vw', display: 'inline-flex', padding: '2em' }}>
							<Link href="https://www.instagram.com/copiacircle/" target="_blank">View on Instagram</Link>
						</Button>
						<Pagination sx={{width: '50%'}} count={Math.ceil(photos.length/10)} page={mobilePage} onChange={handleMobilePagination} />
					</div>
				</div>
				{modal && modal}
			</div>
		)
	}
}

export default Gallery;