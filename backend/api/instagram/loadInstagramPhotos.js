/**
 * @module /backend/api/instagram/loadInstagramPhotos
 * @requires module:axios
 * @requires module:/backend/routes/photos/setPhotos
 * @permalink Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description Fetches Instagram photos using graph api. Allows for single source retrieval from frontend component(s)
 * 
 */

/**
 * axios
 * @const
 */
const axios = require('axios');
const { setPhotos } = require("../../routes/photos");

/**
 * array of returned photo/media objects as returned by API query
 * @const
 * @type {object}
 */
const photoArray = [];

/**
 * @description
 * https fetches photos/posts from the copiarts_test Instagram acct.
 * pushes results to /backend/routes/photos endpoint for easy retrieval by
 * relevant frontend component(s)
 */
async function authAndGetPhotos() {
	/**
	 * copiarts_test acct id
	 * @const
	 * @type {string}
	 */
	const ACCT = process.env.INSTA_ACCT;

	/**
	 * API token
	 * @const
	 * @type {string}
	 */
	const TOKEN = process.env.INSTA_TOKEN;

	/**
	 * API response object
	 * @const
	 * @type {object}
	 */
	const responseObject = await axios.get(
		`https://graph.instagram.com/v21.0/${ACCT}/media?access_token=${TOKEN}`
	);

	/**
	 * response object items. in this case, photo/media items.
	 * @type {object}
	 */
	let ids = responseObject.data
	let resp1;
	// let resp2;
	// let resp3;
	// let comments = null;

	ids.data.forEach(async (id) => {
		resp1 = await axios.get(
			`https://graph.instagram.com/v21.0/${id.id}?fields=caption,media_url,permalink,timestamp&access_token=${TOKEN}`
		);

		/**
		 * apparently, Instagram/Facebook requires a lot of hoops to be jumped through before allowing access to comments
		 * on user owned threads. This logic may well hold going forward should we wish to jump through said hoops.
		 */

		/**
		 *
		resp2 = await axios.get( //GET /<IG_MEDIA_ID>/comments
			`https://graph.instagram.com/v21.0/${id.id}/comments?access_token=${token}`
		);
		
		 	if (resp2.data.paging) {
			console.log('resp2.data', resp2.data.paging.next);

			if (resp2.data.paging.cursors.before) {
				resp3 = await axios.get( 
					`https://graph.instagram.com/v21.0/${resp2.data.paging.cursors.before}?fields=hidden%2Cmedia%2Ctimestamp&access_token=${token}`
				)
				console.log('resp3.data1', resp3.data);
				comments = [];
				comments.push({"text": resp3.data.text, "username": resp3.data.username});
			}

			if (resp2.data.paging.cursors.after !== resp2.data.paging.cursors.before) {
				resp3 = await axios.get( 
					`https://graph.instagram.com/v21.0/${resp2.data.paging.cursors.after}?fields=text,username=&access_token=${token}`
				)
				comments.push({"text": resp3.data.text, "username": resp3.data.username});
			}

		}
		 */

		photoArray.push({"media_url": resp1.data.media_url, "caption": resp1.data.caption,
			"permalink": resp1.data.permalink, "timestamp": resp1.data.timestamp});
	});
}

/**
 * @description hosts photoArray array at /backend/routes/photos endpoint
 */
async function getPhotos() {
	await authAndGetPhotos();

	setPhotos(photoArray);
}

// const photoArray = [
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
// 	  caption: 'Breakfast',
// 	  permalink: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
// 	  caption: 'Burger',
// 	  permalink: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
// 	  caption: 'Camera',
// 	  permalink: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
// 	  caption: 'Coffee',
// 	  permalink: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
// 	  caption: 'Hats',
// 	  permalink: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
// 	  caption: 'Honey',
// 	  permalink: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
// 	  caption: 'Basketball',
// 	  permalink: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
// 	  caption: 'Fern',
// 	  permalink: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
// 	  caption: 'Mushrooms',
// 	  permalink: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
// 	  caption: 'Tomato basil',
// 	  permalink: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
// 	  caption: 'Sea star',
// 	  permalink: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
// 	},
// 	{
// 	  media_url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
// 	  caption: 'Bike',
// 	  permalink: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
// 		caption: 'Breakfast',
// 		permalink: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
// 		caption: 'Burger',
// 		permalink: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
// 		caption: 'Camera',
// 		permalink: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
// 		caption: 'Coffee',
// 		permalink: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
// 		caption: 'Hats',
// 		permalink: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
// 		caption: 'Honey',
// 		permalink: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
// 		caption: 'Basketball',
// 		permalink: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
// 		caption: 'Fern',
// 		permalink: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
// 		caption: 'Mushrooms',
// 		permalink: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
// 		caption: 'Tomato basil',
// 		permalink: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
// 		caption: 'Sea star',
// 		permalink: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
// 	},
// 	{
// 		media_url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
// 		caption: 'Bike',
// 		permalink: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
// 	}
//   ];

module.exports = getPhotos;
