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

function Gallery() {

	const [photos, setPhotos] = useState(null);
	const [modal, setModal] = useState(null);

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
        async function fetchPhotos() {
			const photoArray = await CopiartsApi.get('photos');
			console.log('photo array', photoArray);
			setPhotos(photoArray);
        }

        fetchPhotos();
    }, []);

	function showModal(photo) {
		setModal(
			<ThemeProvider theme={galleryTheme}>
				<Modal key={"modal"+photo.media_url} open={true} onClose={() => setModal(null)}
					sx={{overflowY: 'auto'}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
					<Box style={modalStyle}>
						<div style={{height: 'calc(90%)', width: 'calc(100%)' }}>
							<img key={"img2"+photo.media_url} src={photo.media_url} style={{height: 'calc(100%)', width: 'calc(100%)'}} alt="modal image" /><br />
							<Link key={"instalink"+photo.permalink} href={photo.permalink} target="_blank">View on Instagram app</Link>
						</div>
					</Box>
				</Modal>
			</ThemeProvider>
		)
	}

	if (photos) {
		return(
			<>
				<Grid id="daGrid" container rowSpacing={2} columnSpacing={{xs:2, sm:3, md:4}} columns={{xs:2, sm:3, md:4}}>
					{photos.map((photo, idx) => {
						return (
							<><Grid key={"grid"+idx} item xs={1} sm={1} md={1}>
								<Button key={"button"+idx} onClick={() => {showModal(photo)}}>
									<img key={"img"+idx} src={photo.media_url} height={250} width={250} alt="insta image" />
								</Button>
								<figcaption key={"caption"+idx}>{photo.caption}</figcaption>
							</Grid>
							{modal ? modal : null}
							</>
						)
					})}
				</Grid>
			</>
		)
	} else {
		return null;
	}

}

export default Gallery;